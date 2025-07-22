#!/usr/bin/env python3
"""
Metaphone3 REST API

A simple Flask API that provides phonetic encoding using Metaphone3 algorithm.

Endpoints:
- POST /encode - Encode a single word or list of words
- GET /health - Health check endpoint

Requirements:
- Flask
- metaphone3_wrapper.py
- Metaphone3.js
- Node.js

Usage:
    python metaphone3_api.py

API Examples:
    # Single word
    curl -X POST http://localhost:5000/encode \
         -H "Content-Type: application/json" \
         -d '{"word": "smith"}'
    
    # Multiple words
    curl -X POST http://localhost:5000/encode \
         -H "Content-Type: application/json" \
         -d '{"words": ["smith", "john", "doe"]}'
    
    # With options
    curl -X POST http://localhost:5000/encode \
         -H "Content-Type: application/json" \
         -d '{"word": "smith", "encode_vowels": true, "encode_exact": true}'
"""

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import logging
import os
import sys
from datetime import datetime
import json

# Import our Metaphone3 wrapper
try:
    from metaphone3_wrapper import Metaphone3Wrapper, Metaphone3Error
except ImportError:
    print("Error: metaphone3_wrapper.py not found. Make sure it's in the same directory.")
    sys.exit(1)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for web frontend usage

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global Metaphone3 wrapper instance
m3_wrapper = None

def initialize_metaphone3():
    """Initialize the Metaphone3 wrapper."""
    global m3_wrapper
    try:
        m3_wrapper = Metaphone3Wrapper()
        logger.info("Metaphone3 wrapper initialized successfully")
        return True
    except Metaphone3Error as e:
        logger.error(f"Failed to initialize Metaphone3 wrapper: {e}")
        return False

def validate_word(word):
    """Validate that the word is a non-empty string."""
    return isinstance(word, str) and word.strip()

def encode_single_word(word, encode_vowels=False, encode_exact=False, key_length=8):
    """Encode a single word with given options."""
    try:
        # Configure wrapper
        m3_wrapper.set_encode_vowels(encode_vowels)
        m3_wrapper.set_encode_exact(encode_exact)
        m3_wrapper.set_key_length(key_length)
        
        # Encode the word
        primary, alternate = m3_wrapper.encode(word)
        
        return {
            "word": word,
            "primary": primary,
            "alternate": alternate if alternate != primary else None,
            "success": True
        }
    except Exception as e:
        logger.error(f"Error encoding word '{word}': {e}")
        return {
            "word": word,
            "error": str(e),
            "success": False
        }

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "service": "Metaphone3 API",
        "timestamp": datetime.now().isoformat(),
        "wrapper_initialized": m3_wrapper is not None
    })

# @app.route('/', methods=['POST'])
# def encode_words():
#     """
#     Main encoding endpoint.
    
#     Accepts JSON payload with:
#     - word (string): Single word to encode
#     - words (list): Multiple words to encode
#     - encode_vowels (bool, optional): Whether to encode vowels (default: false)
#     - encode_exact (bool, optional): Whether to use exact encoding (default: false)
#     - key_length (int, optional): Maximum key length 1-32 (default: 8)
    
#     Returns JSON with phonetic encodings.
#     """
#     if not m3_wrapper:
#         return jsonify({
#             "error": "Metaphone3 wrapper not initialized",
#             "success": False
#         }), 500
    
#     try:
#         # Parse JSON payload
#         data = request.get_json()
#         if not data:
#             return jsonify({
#                 "error": "No JSON data provided",
#                 "success": False
#             }), 400
        
#         # Extract options
#         encode_vowels = data.get('encode_vowels', False)
#         encode_exact = data.get('encode_exact', False)
#         key_length = data.get('key_length', 8)
        
#         # Validate key_length
#         if not (1 <= key_length <= 32):
#             return jsonify({
#                 "error": "key_length must be between 1 and 32",
#                 "success": False
#             }), 400
        
#         # Handle single word
#         if 'word' in data:
#             word = data['word']
#             if not validate_word(word):
#                 return jsonify({
#                     "error": "Invalid word. Must be a non-empty string.",
#                     "success": False
#                 }), 400
            
#             result = encode_single_word(
#                 word.strip(), 
#                 encode_vowels, 
#                 encode_exact, 
#                 key_length
#             )
            
#             if result['success']:
#                 return Response(json.dumps(result), mimetype='application/json')
#             else:
#                 return jsonify(result), 500
        
#         # Handle multiple words
#         elif 'words' in data:
#             words = data['words']
#             if not isinstance(words, list):
#                 return jsonify({
#                     "error": "words must be a list",
#                     "success": False
#                 }), 400
            
#             if len(words) > 100:  # Limit batch size
#                 return jsonify({
#                     "error": "Maximum 100 words per request",
#                     "success": False
#                 }), 400
            
#             results = []
#             for word in words:
#                 if validate_word(word):
#                     result = encode_single_word(
#                         word.strip(), 
#                         encode_vowels, 
#                         encode_exact, 
#                         key_length
#                     )
#                     results.append(result)
#                 else:
#                     results.append({
#                         "word": str(word),
#                         "error": "Invalid word",
#                         "success": False
#                     })
            
#             return jsonify({
#                 "results": results,
#                 "success": True,
#                 "total": len(results)
#             })
        
#         else:
#             return jsonify({
#                 "error": "Either 'word' or 'words' must be provided",
#                 "success": False
#             }), 400
            
#     except Exception as e:
#         logger.error(f"Error processing request: {e}")
#         return jsonify({
#             "error": "Internal server error",
#             "success": False
#         }), 500
@app.route('/', methods=['POST'])
def encode_words_udf():
    """
    BigQuery UDF compatible endpoint for Metaphone3 encoding.
    
    Accepts JSON payload with:
    - calls (list): List of function calls, each containing [word] as parameters
    
    Returns JSON with:
    - replies (list): List of encodings in format "primary|alternate" or "INVALID|INVALID"
    """
    if not m3_wrapper:
        return jsonify({
            "error": "Metaphone3 wrapper not initialized"
        }), 500
    
    try:
        # Parse JSON payload
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No JSON data provided"
            }), 400
        
        # Validate input format
        if 'calls' not in data:
            return jsonify({
                "error": "Missing 'calls' field"
            }), 400
        
        calls = data['calls']
        if not isinstance(calls, list):
            return jsonify({
                "error": "'calls' must be a list"
            }), 400
        
        # Process each call
        replies = []
        for call in calls:
            try:
                # Each call should be a list with one parameter (the word)
                if not isinstance(call, list) or len(call) != 1:
                    replies.append("INVALID|INVALID")
                    continue
                
                word = call[0]
                
                # Handle empty or invalid words
                if not word or not isinstance(word, str) or not word.strip():
                    replies.append("INVALID|INVALID")
                    continue
                
                # Clean the word
                word = word.strip()
                
                # Validate word (assuming you have a validate_word function)
                if not validate_word(word):
                    replies.append("INVALID|INVALID")
                    continue
                
                # Encode the word using default settings
                # You can adjust these parameters as needed
                result = encode_single_word(
                    word,
                    encode_vowels=False,  # Default setting
                    encode_exact=False,   # Default setting
                    key_length=8          # Default setting
                )
                
                if result['success']:
                    # Format as primary|alternate (without quotes)
                    primary = result.get('primary', 'INVALID')
                    alternate = result.get('alternate', 'INVALID')
                    replies.append(f"{primary}")
                else:
                    replies.append("INVALID")
                    
            except Exception as e:
                logger.error(f"Error processing call {call}: {e}")
                replies.append("INVALID")
        
        # Return in BigQuery UDF format
        return jsonify({
            "replies": replies
        })
            
    except Exception as e:
        logger.error(f"Error processing UDF request: {e}")
        return jsonify({
            "error": "Internal server error"
        }), 500


# Keep the original endpoint for backwards compatibility
@app.route('/encode', methods=['POST'])
def encode_words_original():
    """
    Original encoding endpoint (for backwards compatibility).
    
    Accepts JSON payload with:
    - word (string): Single word to encode
    - words (list): Multiple words to encode
    - encode_vowels (bool, optional): Whether to encode vowels (default: false)
    - encode_exact (bool, optional): Whether to use exact encoding (default: false)
    - key_length (int, optional): Maximum key length 1-32 (default: 8)
    
    Returns JSON with phonetic encodings.
    """
    if not m3_wrapper:
        return jsonify({
            "error": "Metaphone3 wrapper not initialized",
            "success": False
        }), 500
    
    try:
        # Parse JSON payload
        data = request.get_json()
        if not data:
            return jsonify({
                "error": "No JSON data provided",
                "success": False
            }), 400
        
        # Extract options
        encode_vowels = data.get('encode_vowels', False)
        encode_exact = data.get('encode_exact', False)
        key_length = data.get('key_length', 8)
        
        # Validate key_length
        if not (1 <= key_length <= 32):
            return jsonify({
                "error": "key_length must be between 1 and 32",
                "success": False
            }), 400
        
        # Handle single word
        if 'word' in data:
            word = data['word']
            if not validate_word(word):
                return jsonify({
                    "error": "Invalid word. Must be a non-empty string.",
                    "success": False
                }), 400
            
            result = encode_single_word(
                word.strip(), 
                encode_vowels, 
                encode_exact, 
                key_length
            )
            
            if result['success']:
                return jsonify(result)
            else:
                return jsonify(result), 500
        
        # Handle multiple words
        elif 'words' in data:
            words = data['words']
            if not isinstance(words, list):
                return jsonify({
                    "error": "words must be a list",
                    "success": False
                }), 400
            
            if len(words) > 100:  # Limit batch size
                return jsonify({
                    "error": "Maximum 100 words per request",
                    "success": False
                }), 400
            
            results = []
            for word in words:
                if validate_word(word):
                    result = encode_single_word(
                        word.strip(), 
                        encode_vowels, 
                        encode_exact, 
                        key_length
                    )
                    results.append(result)
                else:
                    results.append({
                        "word": str(word),
                        "error": "Invalid word",
                        "success": False
                    })
            
            return jsonify({
                "results": results,
                "success": True,
                "total": len(results)
            })
        
        else:
            return jsonify({
                "error": "Either 'word' or 'words' must be provided",
                "success": False
            }), 400
            
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({
            "error": "Internal server error",
            "success": False
        }), 500
    
@app.route('/settings', methods=['GET'])
def get_settings():
    """Get current Metaphone3 settings."""
    if not m3_wrapper:
        return jsonify({
            "error": "Metaphone3 wrapper not initialized",
            "success": False
        }), 500
    
    return jsonify({
        "settings": m3_wrapper.get_settings(),
        "success": True
    })

# @app.route('/', methods=['GET'])
# def root():
#     """Root endpoint with API documentation."""
#     return jsonify({
#         "service": "Metaphone3 Phonetic Encoding API",
#         "version": "1.0",
#         "endpoints": {
#             "POST /encode": {
#                 "description": "Encode word(s) phonetically",
#                 "parameters": {
#                     "word": "Single word to encode (string)",
#                     "words": "Multiple words to encode (array)",
#                     "encode_vowels": "Encode non-initial vowels (boolean, default: false)",
#                     "encode_exact": "Use exact consonant encoding (boolean, default: false)",
#                     "key_length": "Maximum encoding length (integer, 1-32, default: 8)"
#                 }
#             },
#             "GET /health": "Health check",
#             "GET /settings": "Get current settings",
#             "GET /": "This documentation"
#         },
#         "examples": {
#             "single_word": {
#                 "url": "/encode",
#                 "method": "POST",
#                 "body": {"word": "smith"}
#             },
#             "multiple_words": {
#                 "url": "/encode", 
#                 "method": "POST",
#                 "body": {"words": ["smith", "john", "doe"]}
#             },
#             "with_options": {
#                 "url": "/encode",
#                 "method": "POST", 
#                 "body": {
#                     "word": "smith",
#                     "encode_vowels": True,
#                     "encode_exact": True
#                 }
#             }
#         }
#     })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        "error": "Endpoint not found",
        "success": False
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors."""
    return jsonify({
        "error": "Method not allowed",
        "success": False
    }), 405

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({
        "error": "Internal server error",
        "success": False
    }), 500

if __name__ == '__main__':
    print("Starting Metaphone3 API...")
    
    # Initialize Metaphone3 wrapper
    if not initialize_metaphone3():
        print("Failed to initialize Metaphone3 wrapper. Exiting.")
        sys.exit(1)
    
    print("Metaphone3 API is ready!")
    print("\nAPI Endpoints:")
    print("  GET  /          - API documentation")
    print("  POST /encode    - Encode words")
    print("  GET  /health    - Health check")
    print("  GET  /settings  - Current settings")
    print(f"\nServer starting on http://localhost:5000")
    
    # Start the Flask development server
    app.run(
        host='0.0.0.0',
        port=8080,
        debug=True,
        threaded=True
    )
