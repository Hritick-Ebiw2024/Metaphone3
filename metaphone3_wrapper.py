#!/usr/bin/env python3
"""
Metaphone3 Python Wrapper

This module provides a Python interface to the Metaphone3 JavaScript implementation.
It uses Node.js to execute the JavaScript code and return phonetic encodings.

Requirements:
- Node.js installed and accessible via 'node' command
- Metaphone3.js file in the same directory or specified path

Usage:
    from metaphone3_wrapper import Metaphone3Wrapper
    
    # Initialize wrapper
    m3 = Metaphone3Wrapper()
    
    # Get phonetic encoding
    primary, alternate = m3.encode("hello")
    print(f"Primary: {primary}, Alternate: {alternate}")
    
    # Configure options
    m3.set_encode_vowels(True)
    m3.set_encode_exact(True)
    primary, alternate = m3.encode("hello")
"""

import subprocess
import json
import os
import tempfile
from typing import Tuple, Optional, Union


class Metaphone3Error(Exception):
    """Custom exception for Metaphone3 wrapper errors."""
    pass


class Metaphone3Wrapper:
    """
    Python wrapper for the Metaphone3 JavaScript implementation.
    
    This class provides a convenient Python interface to generate phonetic
    encodings using the Metaphone3 algorithm implemented in JavaScript.
    """
    
    def __init__(self, js_file_path: str = "Metaphone3.js", node_command: str = "node"):
        """
        Initialize the Metaphone3 wrapper.
        
        Args:
            js_file_path (str): Path to the Metaphone3.js file
            node_command (str): Command to run Node.js (default: "node")
        
        Raises:
            Metaphone3Error: If Node.js is not available or JS file not found
        """
        self.js_file_path = os.path.abspath(js_file_path)
        self.node_command = node_command
        self.encode_vowels = False
        self.encode_exact = False
        self.key_length = 8
        
        # Verify Node.js is available
        self._check_node_availability()
        
        # Verify JavaScript file exists
        if not os.path.exists(self.js_file_path):
            raise Metaphone3Error(f"Metaphone3.js file not found at: {self.js_file_path}")
    
    def _check_node_availability(self) -> None:
        """Check if Node.js is available and working."""
        try:
            result = subprocess.run(
                [self.node_command, "--version"],
                capture_output=True,
                text=True,
                timeout=10
            )
            if result.returncode != 0:
                raise Metaphone3Error("Node.js is not working properly")
        except (subprocess.TimeoutExpired, FileNotFoundError):
            raise Metaphone3Error(
                f"Node.js not found. Please install Node.js and ensure '{self.node_command}' "
                "command is available in your PATH."
            )
    
    def _create_js_runner(self, word: str) -> str:
        """
        Create JavaScript code to run Metaphone3 encoding.
        
        Args:
            word (str): Word to encode
            
        Returns:
            str: JavaScript code as string
        """
        # Escape the word for safe JavaScript usage
        escaped_word = json.dumps(word)
        
        js_code = f"""
const fs = require('fs');

try {{
    // Load the Metaphone3 implementation
    const metaphone3Code = fs.readFileSync('{self.js_file_path.replace(os.sep, '/')}', 'utf8');
    eval(metaphone3Code);
    
    // Create Metaphone3 instance
    const m3 = new Metaphone3();
    
    // Configure settings
    m3.SetEncodeVowels({json.dumps(self.encode_vowels)});
    m3.SetEncodeExact({json.dumps(self.encode_exact)});
    m3.SetKeyLength({self.key_length});
    
    // Set word and encode
    m3.SetWord({escaped_word});
    m3.Encode();
    
    // Get results
    const primary = m3.GetMetaph();
    const alternate = m3.GetAlternateMetaph();
    
    // Output as JSON
    console.log(JSON.stringify({{
        success: true,
        primary: primary || "",
        alternate: alternate || "",
        word: {escaped_word}
    }}));
    
}} catch (error) {{
    console.log(JSON.stringify({{
        success: false,
        error: error.message,
        word: {escaped_word}
    }}));
}}
"""
        return js_code
    
    def encode(self, word: str) -> Tuple[str, str]:
        """
        Encode a word using Metaphone3 algorithm.
        
        Args:
            word (str): Word to encode
            
        Returns:
            Tuple[str, str]: Primary and alternate phonetic encodings
            
        Raises:
            Metaphone3Error: If encoding fails
        """
        if not word or not isinstance(word, str):
            return "", ""
        
        # Create temporary JavaScript file
        js_code = self._create_js_runner(word)
        
        try:
            with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as temp_file:
                temp_file.write(js_code)
                temp_file_path = temp_file.name
            
            # Execute JavaScript
            result = subprocess.run(
                [self.node_command, temp_file_path],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            # Parse result
            if result.returncode == 0:
                try:
                    output = json.loads(result.stdout.strip())
                    if output.get('success'):
                        return output.get('primary', ''), output.get('alternate', '')
                    else:
                        raise Metaphone3Error(f"JavaScript error: {output.get('error', 'Unknown error')}")
                except json.JSONDecodeError:
                    raise Metaphone3Error(f"Invalid JSON output: {result.stdout}")
            else:
                raise Metaphone3Error(f"Node.js execution failed: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            raise Metaphone3Error("Timeout while executing JavaScript")
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file_path)
            except:
                pass
    
    def encode_list(self, words: list) -> list:
        """
        Encode a list of words.
        
        Args:
            words (list): List of words to encode
            
        Returns:
            list: List of tuples containing (word, primary, alternate)
        """
        results = []
        for word in words:
            try:
                primary, alternate = self.encode(word)
                results.append((word, primary, alternate))
            except Metaphone3Error as e:
                results.append((word, "", f"Error: {e}"))
        return results
    
    def set_encode_vowels(self, encode_vowels: bool) -> None:
        """
        Set whether to encode non-initial vowels.
        
        Args:
            encode_vowels (bool): True to encode vowels, False otherwise
        """
        self.encode_vowels = bool(encode_vowels)
    
    def set_encode_exact(self, encode_exact: bool) -> None:
        """
        Set whether to encode consonants exactly.
        
        Args:
            encode_exact (bool): True for exact encoding, False for approximate
        """
        self.encode_exact = bool(encode_exact)
    
    def set_key_length(self, length: int) -> None:
        """
        Set maximum length of encoded keys.
        
        Args:
            length (int): Maximum key length (1-32)
        """
        if 1 <= length <= 32:
            self.key_length = length
        else:
            raise ValueError("Key length must be between 1 and 32")
    
    def get_settings(self) -> dict:
        """
        Get current settings.
        
        Returns:
            dict: Current configuration settings
        """
        return {
            'encode_vowels': self.encode_vowels,
            'encode_exact': self.encode_exact,
            'key_length': self.key_length,
            'js_file_path': self.js_file_path
        }


def main():
    """Example usage and testing."""
    try:
        # Initialize wrapper
        print("Initializing Metaphone3 wrapper...")
        m3 = Metaphone3Wrapper()
        
        # Test words
        test_words = [
            "hello", "world", "python", "javascript", "metaphone",
            "phonetic", "algorithm", "encoding", "pronunciation"
        ]
        
        print(f"\\nCurrent settings: {m3.get_settings()}")
        
        print("\\n=== Standard Encoding ===")
        for word in test_words:
            primary, alternate = m3.encode(word)
            if alternate and alternate != primary:
                print(f"{word:12} -> {primary:8} | {alternate}")
            else:
                print(f"{word:12} -> {primary}")
        
        # Test with vowel encoding
        print("\\n=== With Vowel Encoding ===")
        m3.set_encode_vowels(True)
        for word in test_words[:5]:
            primary, alternate = m3.encode(word)
            if alternate and alternate != primary:
                print(f"{word:12} -> {primary:8} | {alternate}")
            else:
                print(f"{word:12} -> {primary}")
        
        # Test with exact encoding
        print("\\n=== With Exact Encoding ===")
        m3.set_encode_exact(True)
        for word in test_words[:5]:
            primary, alternate = m3.encode(word)
            if alternate and alternate != primary:
                print(f"{word:12} -> {primary:8} | {alternate}")
            else:
                print(f"{word:12} -> {primary}")
        
        # Test batch encoding
        print("\\n=== Batch Encoding ===")
        m3.set_encode_vowels(False)
        m3.set_encode_exact(False)
        batch_results = m3.encode_list(["smith", "smyth", "schmidt"])
        for word, primary, alternate in batch_results:
            print(f"{word:10} -> {primary:8} | {alternate}")
            
    except Metaphone3Error as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")


if __name__ == "__main__":
    main()