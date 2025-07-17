/**
 * Metaphone 3<br>
 * VERSION 2.5.4 copyright 2015
 * by Lawrence Philips<br>
 * 
 * Metaphone 3 is designed to return an *approximate* phonetic key (and an alternate
 * approximate phonetic key when appropriate) that should be the same for English
 * words, and most names familiar in the United States, that are pronounced *similarly*.
 * The key value is *not* intended to be an *exact* phonetic, or even phonemic,
 * representation of the word. This is because a certain degree of 'fuzziness' has
 * proven to be useful in compensating for variations in pronunciation, as well as
 * misheard pronunciations. For example, although americans are not usually aware of it,
 * the letter 's' is normally pronounced 'z' at the end of words such as "sounds".<br><br>
 * 
 * The 'approximate' aspect of the encoding is implemented according to the following rules:<br><br>
 * 
 * (1) All vowels are encoded to the same value - 'A'. If the parameter encodeVowels
 * is set to false, only *initial* vowels will be encoded at all. If encodeVowels is set
 * to true, 'A' will be encoded at all places in the word that any vowels are normally
 * pronounced. 'W' as well as 'Y' are treated as vowels. Although there are differences in
 * the pronunciation of 'W' and 'Y' in different circumstances that lead to their being
 * classified as vowels under some circumstances and as consonants in others, for the purposes
 * of the 'fuzziness' component of the Soundex and Metaphone family of algorithms they will
 * be always be treated here as vowels.<br><br>
 *
 * (2) Voiced and un-voiced consonant pairs are mapped to the same encoded value. This
 * means that:<br>
 * 'D' and 'T' -> 'T'<br>
 * 'B' and 'P' -> 'P'<br>
 * 'G' and 'K' -> 'K'<br>
 * 'Z' and 'S' -> 'S'<br>
 * 'V' and 'F' -> 'F'<br><br>
 *
 * - In addition to the above voiced/unvoiced rules, 'CH' and 'SH' -> 'X', where 'X'
 * represents the "-SH-" and "-CH-" sounds in Metaphone 3 encoding.<br><br>
 *
 * - Also, the sound that is spelled as "TH" in English is encoded to '0' (zero symbol). (Although
 * Americans are not usually aware of it, "TH" is pronounced in a voiced (e.g. "that") as
 * well as an unvoiced (e.g. "theater") form, which are naturally mapped to the same encoding.)<br><br>
 * 
 * The encodings in this version of Metaphone 3 are according to pronunciations common in the
 * United States. This means that they will be inaccurate for consonant pronunciations that
 * are different in the United Kingdom, for example "tube" -> "CHOOBE" -> XAP rather than american TAP.<br><br>
 *
 * Metaphone 3 was preceded by by Soundex, patented in 1919, and Metaphone and Double Metaphone,
 * developed by Lawrence Philips. All of these algorithms resulted in a significant number of
 * incorrect encodings. Metaphone3 was tested against a database of about 100 thousand English words,
 * names common in the United States, and non-English words found in publications in the United States,
 * with an emphasis on words that are commonly mispronounced, prepared by the Moby Words website,
 * but with the Moby Words 'phonetic' encodings algorithmically mapped to Double Metaphone encodings.
 * Metaphone3 increases the accuracy of encoding of english words, common names, and non-English
 * words found in american publications from the 89% for Double Metaphone, to over 98%.<br><br>
 *
 * DISCLAIMER:
 * Anthropomorphic Software LLC claims only that Metaphone 3 will return correct encodings,
 * within the 'fuzzy' definition of correct as above, for a very high percentage of correctly
 * spelled English and commonly recognized non-English words. Anthropomorphic Software LLC
 * warns the user that a number of words remain incorrectly encoded, that misspellings may not
 * be encoded 'properly', and that people often have differing ideas about the pronunciation
 * of a word. Therefore, Metaphone 3 is not guaranteed to return correct results every time, and
 * so a desired target word may very well be missed. Creators of commercial products should
 * keep in mind that systems like Metaphone 3 produce a 'best guess' result, and should
 * condition the expectations of end users accordingly.<br><br>
 *
 * METAPHONE3 IS PROVIDED "AS IS" WITHOUT
 * WARRANTY OF ANY KIND. LAWRENCE PHILIPS AND ANTHROPOMORPHIC SOFTWARE LLC
 * MAKE NO WARRANTIES, EXPRESS OR IMPLIED, THAT IT IS FREE OF ERROR,
 * OR ARE CONSISTENT WITH ANY PARTICULAR STANDARD OF MERCHANTABILITY, 
 * OR THAT IT WILL MEET YOUR REQUIREMENTS FOR ANY PARTICULAR APPLICATION.
 * LAWRENCE PHILIPS AND ANTHROPOMORPHIC SOFTWARE LLC DISCLAIM ALL LIABILITY
 * FOR DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES RESULTING FROM USE 
 * OF THIS SOFTWARE. 
 *
 * @author Lawrence Philips
 * 
 * Metaphone 3 is designed to return an <i>approximate</i> phonetic key (and an alternate
 * approximate phonetic key when appropriate) that should be the same for English
 * words, and most names familiar in the United States, that are pronounced "similarly".
 * The key value is <i>not</i> intended to be an exact phonetic, or even phonemic,
 * representation of the word. This is because a certain degree of 'fuzziness' has
 * proven to be useful in compensating for variations in pronunciation, as well as
 * misheard pronunciations. For example, although americans are not usually aware of it,
 * the letter 's' is normally pronounced 'z' at the end of words such as "sounds".<br><br>
 * 
 * The 'approximate' aspect of the encoding is implemented according to the following rules:<br><br>
 * 
 * (1) All vowels are encoded to the same value - 'A'. If the parameter encodeVowels
 * is set to false, only *initial* vowels will be encoded at all. If encodeVowels is set
 * to true, 'A' will be encoded at all places in the word that any vowels are normally
 * pronounced. 'W' as well as 'Y' are treated as vowels. Although there are differences in
 * the pronunciation of 'W' and 'Y' in different circumstances that lead to their being
 * classified as vowels under some circumstances and as consonants in others, for the purposes
 * of the 'fuzziness' component of the Soundex and Metaphone family of algorithms they will
 * be always be treated here as vowels.<br><br>
 *
 * (2) Voiced and un-voiced consonant pairs are mapped to the same encoded value. This
 * means that:<br>
 * 'D' and 'T' -> 'T'<br>
 * 'B' and 'P' -> 'P'<br>
 * 'G' and 'K' -> 'K'<br>
 * 'Z' and 'S' -> 'S'<br>
 * 'V' and 'F' -> 'F'<br><br>
 *
 * - In addition to the above voiced/unvoiced rules, 'CH' and 'SH' -> 'X', where 'X'
 * represents the "-SH-" and "-CH-" sounds in Metaphone 3 encoding.<br><br>
 *
 * - Also, the sound that is spelled as "TH" in English is encoded to '0' (zero symbol). (Although
 * americans are not usually aware of it, "TH" is pronounced in a voiced (e.g. "that") as
 * well as an unvoiced (e.g. "theater") form, which are naturally mapped to the same encoding.)<br><br>
 *
 * In the "Exact" encoding, voiced/unvoiced pairs are <i>not</i> mapped to the same encoding, except
 * for the voiced and unvoiced versions of 'TH', sounds such as 'CH' and 'SH', and for 'S' and 'Z',
 * so that the words whose metaph keys match will in fact be closer in pronunciation that with the
 * more approximate setting. Keep in mind that encoding settings for search strings should always
 * be exactly the same as the encoding settings of the stored metaph keys in your database!
 * Because of the considerably increased accuracy of Metaphone3, it is now possible to use this
 * setting and have a very good chance of getting a correct encoding.
 * <br><br>
 * In the Encode Vowels encoding, all non-initial vowels and diphthongs will be encoded to
 * 'A', and there will only be one such vowel encoding character between any two consonants.
 * It turns out that there are some surprising wrinkles to encoding non-initial vowels in
 * practice, pre-eminently in inversions between spelling and pronunciation such as e.g.
 * "wrinkle" => 'RANKAL', where the last two sounds are inverted when spelled.
 * <br><br>
 * The encodings in this version of Metaphone 3 are according to pronunciations common in the
 * United States. This means that they will be inaccurate for consonant pronunciations that
 * are different in the United Kingdom, for example "tube" -> "CHOOBE" -> XAP rather than american TAP.
 * <br><br>
 * 
 */ 

/** Length of word sent in to be encoded, as 
* measured at beginning of encoding. */
var m_length;

/** Length of encoded key string. */
var m_metaphLength;

/** Flag whether or not to encode non-initial vowels. */
var m_encodeVowels;

/** Flag whether or not to encode consonants as exactly 
* as possible. */
var m_encodeExact;

/** Internal copy of word to be encoded, allocated separately
* from pointed to in incoming parameter. */
var m_inWord;

/** Running copy of primary key. */
var m_primary;

/** Running copy of secondary key. */
var m_secondary;

/** Index of character in m_inWord currently being
* encoded. */
var m_current;

/** Index of last character in m_inWord. */
var m_last;

/** Flag that an AL inversion has already been done. */
var flag_AL_inversion;

/** Default size of key storage allocation */
var MAX_KEY_ALLOCATION = 32;

/** Default maximum length of encoded key. */
var DEFAULT_MAX_KEY_LENGTH = 8; 
	
////////////////////////////////////////////////////////////////////////////////
// Metaphone3 class definition
////////////////////////////////////////////////////////////////////////////////

/**
 * Constructor, default. This constructor is most convenient when
 * encoding more than one word at a time. New words to encode can
 * be set using SetWord(*).
 *
 */
function Metaphone3()
{
    m_metaphLength = DEFAULT_MAX_KEY_LENGTH;
    
    m_encodeVowels = false;
	m_encodeExact = false;
}

/**
 * Sets word to be encoded.
 * 
 * @param in pointer to EXTERNALLY ALLOCATED of 
 * the word to be encoded.
 *
 */
Metaphone3.prototype.SetWord = function(inStr)
{
	m_inWord = inStr.toUpperCase();
	m_length = m_inWord.length;
}

/**
 * Sets length allocated for output keys.
 * If incoming number is greater than maximum allowable 
 * length returned by GetMaximumKeylength, set key length
 * to maximum key length and return false;  otherwise, set key 
 * length to parameter value and return true.
 * 
 * @param inKeyLength new length of key.
 * @return true if able to set key length to requested value.
 *
*/
Metaphone3.prototype.SetKeyLength = function(inKeyLength)
{
    if(inKeyLength < 1)
	{
		// can't have that -
		// no room for terminating null
		inKeyLength = 1;
	}

	if(inKeyLength > MAX_KEY_ALLOCATION)
    {
        m_metaphLength = MAX_KEY_ALLOCATION;
        return false;
    }

     m_metaphLength = inKeyLength;
     return true;
}

/**
 * Make sure that no more than one 'A' in a row is encoded
 * 
 * @param metaph
 * @param inEncoding
 * @return
 */
Metaphone3.prototype.cleanVowels = function(metaph, inEncoding)
{
	if((inEncoding.charAt(0) == 'A')
		&& (metaph.length > 0) 
		&& (metaph.charAt(metaph.length - 1) == 'A'))
	{
		if (inEncoding.length > 1)
		{
			return inEncoding.substr(1, 1);
		}
		else
		{
			return "";
		}
	}

	return inEncoding;
}

/**
 * Adds an encoding character to the encoded key value - one parameter version.
 * 
 * @param main primary encoding character to be added to encoded key string.
 */
Metaphone3.prototype.MetaphAdd = function(inStr)
{
	if (inStr.length < 1)
	{
		return;
	}
	
	m_primary += this.cleanVowels(m_primary, inStr);
	
	m_secondary += this.cleanVowels(m_secondary, inStr);   
}

/**
 * Adds an encoding character to the encoded key value - two parameter version
 * 
 * @param main primary encoding character to be added to encoded key string
 * @param alt alternative encoding character to be added to encoded alternative key string
 *
 */
Metaphone3.prototype.MetaphAddWithAlt = function(main, alt)
{
	if(main.length > 0)
	{
    	m_primary += this.cleanVowels(m_primary, main);
	}
	
	if(alt)
	{
		m_secondary += this.cleanVowels(m_secondary, alt);
	}
}

/**
 * Adds an encoding character to the encoded key value - Exact/Approx version
 * 
 * @param mainExact primary encoding character to be added to encoded key if 
 * m_encodeExact is set
 *
 * @param altExact alternative encoding character to be added to encoded alternative 
 * key if m_encodeExact is set
 *
 * @param main primary encoding character to be added to encoded key string
 *
 * @param alt alternative encoding character to be added to encoded alternative key string
 *
 */	
Metaphone3.prototype.MetaphAddExactApprox4 = function(mainExact, altExact, main, alt)
{
	if(m_encodeExact)
	{
		this.MetaphAddWithAlt(mainExact, altExact);
	}
	else
	{
		this.MetaphAddWithAlt(main, alt);
	}
}

/**
 * Adds an encoding character to the encoded key value - Exact/Approx version
 * 
 * @param mainExact primary encoding character to be added to encoded key if 
 * m_encodeExact is set
 *
 * @param main primary encoding character to be added to encoded key string
 *
 */	
Metaphone3.prototype.MetaphAddExactApprox = function(mainExact, main)
{
	if(m_encodeExact)
	{
		this.MetaphAdd(mainExact);
	}
	else
	{
		this.MetaphAdd(main);
	}
}	 
/** Retrieves maximum number of characters currently allocated for encoded key. 
 *
 * @return short integer representing the length allowed for the key.
 */
Metaphone3.prototype.GetKeylength = function() {return m_metaphLength;}

/** Retrieves maximum number of characters allowed for encoded key. 
 *
 * @return short integer representing the length of allocated storage for the key.
 */
Metaphone3.prototype.GetMaximumKeylength = function() {return MAX_KEY_ALLOCATION;}

/** Sets flag that causes Metaphone3 to encode non-initial vowels. However, even 
 * if there is more than one vowel sound in a vowel sequence (i.e. 
 * vowel diphthong, etc.), only one 'A' will be encoded before the next consonant or the
 * end of the word.
 *
 * @param inEncodeVowels Non-initial vowels encoded if true, not if false. 
 */
Metaphone3.prototype.SetEncodeVowels = function(inEncodeVowels) {m_encodeVowels = inEncodeVowels;}

/** Retrieves setting determining whether or not non-initial vowels will be encoded. 
 *
 * @return true if the Metaphone3 object has been set to encode non-initial vowels, false if not.
 */
Metaphone3.prototype.GetEncodeVowels = function(){return m_encodeVowels;}

/** Sets flag that causes Metaphone3 to encode consonants as exactly as possible.
 * This does not include 'S' vs. 'Z', since americans will pronounce 'S' at the
 * at the end of many words as 'Z', nor does it include "CH" vs. "SH". It does cause
 * a distinction to be made between 'B' and 'P', 'D' and 'T', 'G' and 'K', and 'V'
 * and 'F'.
 *
 * @param inEncodeExact consonants to be encoded "exactly" if true, not if false. 
 */
Metaphone3.prototype.SetEncodeExact = function(inEncodeExact){m_encodeExact = inEncodeExact;}

/** Retrieves setting determining whether or not consonants will be encoded "exactly".
 *
 * @return true if the Metaphone3 object has been set to encode "exactly", false if not.
 */
Metaphone3.prototype.GetEncodeExact = function(){return m_encodeExact;}

/** Retrieves primary encoded key.
 *
 * @return a character pointer to the primary encoded key
 */
Metaphone3.prototype.GetMetaph = function()
{
	return m_primary;
}

/** Retrieves alternate encoded key, if any. 
 *
 * @return a character pointer to the alternate encoded key
 */
Metaphone3.prototype.GetAlternateMetaph = function()
{
	return m_secondary;
}

/**
 * Test for close front vowels
 *
 * @return true if close front vowel
 */
Metaphone3.prototype.Front_Vowel = function(at)
{
	if((this.GetCharAt(at) == 'E') 
		|| (this.GetCharAt(at) == 'I') 
		|| (this.GetCharAt(at) == 'Y')
		|| (this.GetCharAt(at) == 'È')
		|| (this.GetCharAt(at) == 'É')
 		|| (this.GetCharAt(at) == 'Ê')
		|| (this.GetCharAt(at) == 'Ë')
		|| (this.GetCharAt(at) == 'Ì')
		|| (this.GetCharAt(at) == 'Í')
		|| (this.GetCharAt(at) == 'Î')
 		|| (this.GetCharAt(at) == 'Ï'))
	{
		return true;
	}

	return false;
}

/**
 * Detect names or words that begin with spellings
 * typical of german or slavic words, for the purpose
 * of choosing alternate pronunciations correctly
 *
 */
Metaphone3.prototype.SlavoGermanic = function()
{
	if(this.StringAt(0, 3, "SCH", "")
		|| this.StringAt(0, 2, "SW", "")
		|| (this.GetCharAt(0) == 'J')
		|| (this.GetCharAt(0) == 'W'))
	{
		return true;
	}

	return false;
}	
/**
 * Tests if character is a vowel
 * 
 * @param inChar character to be tested in to be encoded
 * @return true if character is a vowel, false if not
 *
 */
Metaphone3.prototype.IsVowelChar = function(inChar)
{
    if((inChar == 'A') 
			|| (inChar == 'E') 
			|| (inChar == 'I') 
			|| (inChar == 'O') 
			|| (inChar == 'U') 
			|| (inChar == 'Y') 
			|| (inChar == 'À')
			|| (inChar == 'Á')
			|| (inChar == 'Â')
			|| (inChar == 'Ã')
			|| (inChar == 'Ä')
			|| (inChar == 'Å')
			|| (inChar == 'Æ')
			|| (inChar == 'È')
			|| (inChar == 'É')
	 		|| (inChar == 'Ê')
			|| (inChar == 'Ë')
			|| (inChar == 'Ì')
			|| (inChar == 'Í')
			|| (inChar == 'Î')
	 		|| (inChar == 'Ï')
			|| (inChar == 'Ò')
			|| (inChar == 'Ó')
			|| (inChar == 'Ô')
			|| (inChar == 'Õ')
			|| (inChar == 'Ö')
			|| (inChar == 'Œ')
			|| (inChar == 'Ø')
			|| (inChar == 'Ù')
			|| (inChar == 'Ú')
			|| (inChar == 'Û')
			|| (inChar == 'Ü')
			|| (inChar == 'Ý')
			|| (inChar == 'Ÿ'))	
	{
        return true;
	}

    return false;
}

/**
 * Tests if character in the input is a vowel
 * 
 * @param at position of character to be tested in to be encoded
 * @return true if character is a vowel, false if not
 *
 */
Metaphone3.prototype.IsVowel = function(at)
{
    if((at < 0) || (at >= m_length))
	{
        return false;
	}

    it = this.GetCharAt(at);

    if(this.IsVowelChar(it))
	{
        return true;
	}

    return false;
}

/**
 * Skips over vowels in a string. Has exceptions for skipping consonants that
 * will not be encoded.
 *
 * @param at position, in to be encoded, of character to start skipping from
 *
 * @return position of next consonant in to be encoded 
 */
Metaphone3.prototype.SkipVowels = function(at)
{
    if(at < 0)
	{
        return 0;
	}

    if(at >= m_length)
	{
        return m_length;
	}

    it = this.GetCharAt(at);

    while(this.IsVowelChar(it) || (it == 'W'))
    {
        if(this.Eastern_European_Name_Ending(at))
        {
            break;
        }
        at++;
        
        if(((this.GetCharAt(at - 1) == 'W') && (this.GetCharAt(at) == 'H'))
            && !(this.StringAt(at, 3, "HOP", "")
                  || this.StringAt(at, 4, "HIDE", "HARD", "HEAD", "HAWK", "HERD", "HOOK", "HAND", "HOLE", "")
                  || this.StringAt(at, 5, "HEART", "HOUSE", "HOUND", "")
                  || this.StringAt(at, 6, "HAMMER", "")))
		{
            at++;
		}
        
        if(at > (m_length - 1))
        {
        	break;
        }
        it = this.GetCharAt(at);
    }

    return at;
}

/**
 * Advanced counter m_current so that it indexes the next character to be encoded
 *
 * @param ifNotEncodeVowels number of characters to advance if not encoding internal vowels
 * @param ifEncodeVowels number of characters to advance if encoding internal vowels
 *
 */
Metaphone3.prototype.AdvanceCounter = function(ifNotEncodeVowels, ifEncodeVowels)
{
	if(!m_encodeVowels)
	{
		m_current += ifNotEncodeVowels;
	}
	else
	{
		m_current += ifEncodeVowels;
	}
}


/**
 * Subscript safe .charAt()
 * 
 * @param at index of character to access
 * @return null if index out of bounds, .charAt() otherwise
 */
Metaphone3.prototype.GetCharAt = function(at)
{
    // check subbounds
	if((at < 0)
    	|| (at > (m_length - 1)))
    {
    	return '\0';
    }

    return m_inWord.charAt(at);
}

/**
 * Tests whether the word is the root or a regular english inflection
 * of it, e.g. "ache", "achy", "aches", "ached", "aching", "achingly"
 * This is for cases where we want to match only the root and corresponding
 * inflected forms, and not completely different words which may have the
 * same subin them.
 */
Metaphone3.prototype.RootOrInflections = function(inWord, root)
{
	len = root.length;

	test = root + "S";
	if((inWord == root)
			|| (inWord == test))
	{
		return true;
	}

	if(root.charAt(len - 1) != 'E')
	{
		test = root + "ES";
	}
	
	if(inWord == test)
	{
		return true;
	}

	if(root.charAt(len - 1) != 'E')
	{
		test = root + "ED";
	}
	else
	{
		test = root + "D";
	}
	
	if(inWord == test)
	{
		return true;
	}

	if(root.charAt(len - 1) == 'E')
	{
		root = root.substring(0, len - 1);
	}

	test = root + "ING";
	if(inWord == test)
	{
		return true;
	}

	test = root + "INGLY";
	if(inWord == test)
	{
		return true;
	}

	test = root + "Y";
	if(inWord == test)
	{
		return true;
	}

	return false;
}

/**
 * Determines if one of the substrings sent in is the same as
 * what is at the specified position in the being encoded.
 * 
 * @param start
 * @param length
 * @param compareStrings
 * @return
 */
Metaphone3.prototype.StringAt = function()
{
    var start = arguments[0];
    var length = arguments[1];
    
    // check subbounds
	if((start < 0)
    	|| (start > (m_length - 1))
    	|| ((start + length - 1) > (m_length - 1)))
    {
    	return false;
    }

    target = m_inWord.substring(start, (start + length));
          
    for (var i = 2; i < arguments.length; i++) 
	{
		if(target == arguments[i])
		{
			return true;
		}			
	}
    return false;
}

/**
 * Encodes input to one or two key values according to Metaphone 3 rules.
 *
 */
Metaphone3.prototype.Encode = function()
{
	flag_AL_inversion = false;

    m_current = 0;

	m_primary = '';
    m_secondary = '';

    if(m_length < 1)
	{
        return;
	}

    //zero based index
	m_last = m_length - 1;

    ///////////main loop//////////////////////////
	while(!(m_primary.length > m_metaphLength) && !(m_secondary.length > m_metaphLength))
    {
        if(m_current >= m_length)
		{
            break;
		}

        switch(this.GetCharAt(m_current))
        {	                        
            case 'B':

				this.Encode_B();
                break;
                        
            case 'ß':
			case 'Ç':

                this.MetaphAdd("S");
                m_current++;
                break;

            case 'C':

				this.Encode_C();
                break;

            case 'D':

				this.Encode_D();
                break;

            case 'F':
                    
				this.Encode_F();
                break;

            case 'G':

				this.Encode_G();
                break;

            case 'H':

				this.Encode_H();
                break;
                
            case 'J':

				this.Encode_J();
                break;

            case 'K':

				this.Encode_K();
                break;

            case 'L':

				this.Encode_L();
                break;

            case 'M':

				this.Encode_M();
                break;

            case 'N':

				this.Encode_N();
                break;

            case 'Ñ':
                
                this.MetaphAdd("N");
                m_current++;
                break;

            case 'P':

				this.Encode_P();
                break;

            case 'Q':

				this.Encode_Q();
                break;

            case 'R':

				this.Encode_R();
				break;

            case 'S':

				this.Encode_S();
                break;

            case 'T':

				this.Encode_T();
                break;

            case 'Ð': // eth
			case 'Þ': // thorn

                this.MetaphAdd("0");
                m_current++;
                break;

           case 'V':

				this.Encode_V();
                break;

            case 'W':

				this.Encode_W();
                break;

            case 'X':

				this.Encode_X();
                break;

            case 'Š':

                this.MetaphAdd("X");
                m_current++;
                break;

			case 'Ž':

                this.MetaphAdd("S");
                m_current++;
                break;

            case 'Z':
				
                this.Encode_Z();
                break;

            default:
            	
				if(this.IsVowelChar(this.GetCharAt(m_current)))
				{
					this.Encode_Vowels();
					break;
				}
            
                m_current++;
                
        }
    }
    
	//only give back m_metaphLength number of chars in m_metaph
	if(m_primary.length > m_metaphLength)
    {
		m_primary = m_primary.substring(0, m_metaphLength);
    }

	if(m_secondary.length > m_metaphLength)
    {
		m_secondary = m_secondary.substring(0, m_metaphLength);
    }

	// it is possible for the two metaphs to be the same 
	// after truncation. lose the second one if so
	if(m_primary == m_secondary)
	{
		m_secondary = m_secondary.substring(0, 0);
	}
}

/**
 * Encodes all initial vowels to A.
 *
 * Encodes non-initial vowels to A if m_encodeVowels is true
 * 
 * 
*/
Metaphone3.prototype.Encode_Vowels = function()
{
	if(m_current == 0)
	{
		// all init vowels map to 'A' 
		// as of Double Metaphone
		this.MetaphAdd("A"); 
	}
	else if(m_encodeVowels)
	{
		if(this.GetCharAt(m_current) != 'E')
		{
			if(this.Skip_Silent_UE())
			{
				return;
			}

            if (this.O_Silent())
            {
                m_current++;
                return;
            }

			// encode all vowels and
			// diphthongs to the same value
			this.MetaphAdd("A"); 
		}
		else
		{
			this.Encode_E_Pronounced();
		}
	}

	if(!(!this.IsVowel(m_current - 2) && this.StringAt((m_current - 1), 4, "LEWA", "LEWO", "LEWI", "")))
	{
		m_current = this.SkipVowels(m_current);
	}
	else
	{
		m_current++;
	}
}

/**
 * Tests and encodes cases where non-initial 'e' is never pronounced
 * Only executed if non initial vowel encoding is turned on
 * 
 * @return true if encoded as silent - no addition to m_metaph key
 *
*/
Metaphone3.prototype.E_Silent = function()
{	
	if(this.E_Pronounced_At_End())
	{
		return false;
	}

	// 'e' silent when last letter, altho
	if((m_current == m_last)
		// also silent if before plural 's'
		// or past tense or participle 'd', e.g.
		// 'grapes' and 'banished' => PNXT
		|| ((this.StringAt(m_last, 1, "S", "D", "")
			&& (m_current > 1)
			&& ((m_current + 1) == m_last)
				// and not e.g. "nested", "rises", or "pieces" => RASAS
				&& !(this.StringAt((m_current - 1), 3, "TED", "SES", "CES", "")
					|| this.StringAt(0, 9, "ANTIPODES", "ANOPHELES", "")
					|| this.StringAt(0, 8, "MOHAMMED", "MUHAMMED", "MOUHAMED", "")
					|| this.StringAt(0, 7, "MOHAMED", "")
					|| this.StringAt(0, 6, "NORRED", "MEDVED", "MERCED", "ALLRED", "KHALED", "RASHED", "MASJED", "")	
					|| this.StringAt(0, 5, "JARED", "AHMED", "HAMED", "JAVED", "") 
					|| this.StringAt(0, 4, "ABED", "IMED", ""))))
			// e.g.  'wholeness', 'boneless', 'barely'
			|| (this.StringAt((m_current + 1), 4, "NESS", "LESS", "") && ((m_current + 4) == m_last))
			|| (this.StringAt((m_current + 1), 2, "LY", "") && ((m_current + 2) == m_last)
					&& !this.StringAt(0, 6, "CICELY", "")))
	{
		return true;
	}

	return false;
}

/**
 * Encodes cases where non-initial 'e' is pronounced, taking
 * care to detect unusual cases from the greek.
 *
 * Only executed if non initial vowel encoding is turned on
 * 
 * 
 */
Metaphone3.prototype.Encode_E_Pronounced = function()
{
	// special cases with two pronunciations
	// 'agape' 'lame' 'resume'
	if((this.StringAt(0, 4, "LAME", "SAKE", "PATE", "") && (m_length == 4))
		|| (this.StringAt(0, 5, "AGAPE", "") && (m_length == 5))
		|| ((m_current == 5) && this.StringAt(0, 6, "RESUME", "")))
	{
		this.MetaphAddWithAlt("", "A");
		return;
	}
	
	// special case "inge" => 'INGA', 'INJ'
	if(this.StringAt(0, 4, "INGE", "")
		&& (m_length == 4))
	{
		this.MetaphAddWithAlt("A", "");
		return;
	}
	
	// special cases with two pronunciations
	// special handling due to the difference in
	// the pronunciation of the '-D'
	if((m_current == 5) && this.StringAt(0, 7, "BLESSED", "LEARNED", ""))
	{
		this.MetaphAddExactApprox4("D", "AD", "T", "AT");
		m_current += 2;
		return;
	}
	
	// encode all vowels and diphthongs to the same value
	if((!this.E_Silent() 
			&& !flag_AL_inversion 
			&& !this.Silent_Internal_E())
			|| this.E_Pronounced_Exceptions())
	{
		this.MetaphAdd("A"); 
	}
	
	// now that we've visited the vowel in question
	flag_AL_inversion = false;
}

/**
 * Tests for cases where non-initial 'o' is not pronounced
 * Only executed if non initial vowel encoding is turned on
 * 
 * @return true if encoded as silent - no addition to m_metaph key
 *
*/
Metaphone3.prototype.O_Silent = function()
{
    // if "iron" at beginning or end of word and not "irony"
    if ((this.GetCharAt(m_current) == 'O')
        && !this.StringAt((m_current - 2), 6, "IRONIC", "")
        && ((this.StringAt((m_current - 2), 4, "IRON", "")
            || (this.StringAt((m_current - 2), 4, "IRON", "")
                && (m_last == (m_current + 1))))
            || this.StringAt((m_current - 2), 5, "IVORY", ""))
            || ((m_current == 3) && this.StringAt((m_current - 3), 9, "LABORATOR", "")))
    {
        return true;
    }

    return false;
}

/**
 * Tests for words where an 'E' at the end of the word
 * is pronounced
 *
 * special cases, mostly from the greek, spanish, japanese, 
 * italian, and french words normally having an acute accent. 
 * also, pronouns and articles
 * 
 * Many Thanks to ali, QuentinCompson, JeffCO, ToonScribe, Xan,
 * Trafalz, and VictorLaszlo, all of them atriots from the Eschaton, 
 * for all their fine contributions!
 * 
 * @return true if 'E' at end is pronounced
 * 
*/
Metaphone3.prototype.E_Pronounced_At_End = function()
{
	if((m_current == m_last)
		&& (this.StringAt((m_current - 6), 7, "STROPHE", "")
		// if a vowel is before the 'E', vowel eater will have eaten it. 
		//otherwise, consonant + 'E' will need 'E' pronounced
		|| (m_length == 2)
		|| ((m_length == 3) && !this.IsVowel(0))
		// these german name endings can be relied on to have the 'e' pronounced
		|| (this.StringAt((m_last - 2), 3, "BKE", "DKE", "FKE", "KKE", "LKE", 
									 "NKE", "MKE", "PKE", "TKE", "VKE", "ZKE", "")
			&& !this.StringAt(0, 5, "FINKE", "FUNKE", "")
			&& !this.StringAt(0, 6, "FRANKE", ""))
		|| this.StringAt((m_last - 4), 5, "SCHKE", "")
		|| (this.StringAt(0, 4, "ACME", "NIKE", "CAFE", "RENE", "LUPE", "JOSE", "ESME", "") && (m_length == 4))
		|| (this.StringAt(0, 5, "LETHE", "CADRE", "TILDE", "SIGNE", "POSSE", "LATTE", "ANIME", "DOLCE", "CROCE", 
							"ADOBE", "OUTRE", "JESSE", "JAIME", "JAFFE", "BENGE", "RUNGE", 
							"CHILE", "DESME", "CONDE", "URIBE", "LIBRE", "ANDRE", "") && (m_length == 5))
		|| (this.StringAt(0, 6, "HECATE", "PSYCHE", "DAPHNE", "PENSKE", "CLICHE", "RECIPE", 
						   "TAMALE", "SESAME", "SIMILE", "FINALE", "KARATE", "RENATE", "SHANTE",  
						   "OBERLE", "COYOTE", "KRESGE", "STONGE", "STANGE", "SWAYZE", "FUENTE", 
						   "SALOME", "URRIBE", "") && (m_length == 6))
		|| (this.StringAt(0, 7, "ECHIDNE", "ARIADNE", "MEINEKE", "PORSCHE", "ANEMONE", "EPITOME", 
							"SYNCOPE", "SOUFFLE", "ATTACHE", "MACHETE", "KARAOKE", "BUKKAKE", 
							"VICENTE", "ELLERBE", "VERSACE", "") && (m_length == 7))
		|| (this.StringAt(0, 8, "PENELOPE", "CALLIOPE", "CHIPOTLE", "ANTIGONE", "KAMIKAZE", "EURIDICE", 
						   "YOSEMITE", "FERRANTE", "") && (m_length == 8))
		|| (this.StringAt(0, 9, "HYPERBOLE", "GUACAMOLE", "XANTHIPPE", "") && (m_length == 9))
		|| (this.StringAt(0, 10, "SYNECDOCHE", "") && (m_length == 10))))
	{
		return true;
	}

	return false;
}

/**
 * Detect internal silent 'E's e.g. "roseman",
 * "firestone"
 * 
 */
Metaphone3.prototype.Silent_Internal_E = function()
{
	// 'olesen' but not 'olen'	RAKE BLAKE 
	if((this.StringAt(0, 3, "OLE", "") 
			&& this.E_Silent_Suffix(3) && !this.E_Pronouncing_Suffix(3))
	   || (this.StringAt(0, 4, "BARE", "FIRE", "FORE", "GATE", "HAGE", "HAVE",
			             "HAZE", "HOLE", "CAPE", "HUSE", "LACE", "LINE", 
			             "LIVE", "LOVE", "MORE", "MOSE", "MORE", "NICE", 
			             "RAKE", "ROBE", "ROSE", "SISE", "SIZE", "WARE", 
			             "WAKE", "WISE", "WINE", "") 
			&& this.E_Silent_Suffix(4) && !this.E_Pronouncing_Suffix(4))
	   || (this.StringAt(0, 5, "BLAKE", "BRAKE", "BRINE", "CARLE", "CLEVE", "DUNNE",
			   			 "HEDGE", "HOUSE", "JEFFE", "LUNCE", "STOKE", "STONE", 
			   			 "THORE", "WEDGE", "WHITE", "") 
			 &&  this.E_Silent_Suffix(5) && !this.E_Pronouncing_Suffix(5))
	   || (this.StringAt(0, 6, "BRIDGE", "CHEESE", "") 
			 && this.E_Silent_Suffix(6) && !this.E_Pronouncing_Suffix(6))
	   || this.StringAt((m_current - 5), 7, "CHARLES", ""))
	{
		return true;
	}
	
	return false;
}

/**
 * Detect conditions required
 * for the 'E' not to be pronounced
 * 
 */
Metaphone3.prototype.E_Silent_Suffix = function(at)
{
	if((m_current == (at - 1)) 
			&& (m_length > (at + 1)) 
			&& (this.IsVowel((at + 1)) 
			|| (this.StringAt(at, 2, "ST", "SL", "") 
				&& (m_length > (at + 2)))))
	{
		return true;	
	}
	
	return false;
}

/**
 * Detect endings that will
 * cause the 'e' to be pronounced
 * 
 */
Metaphone3.prototype.E_Pronouncing_Suffix = function(at)
{		
	// e.g. 'bridgewood' - the other vowels will get eaten
	// up so we need to put one in here
	if((m_length == (at + 4)) && this.StringAt(at, 4, "WOOD", ""))
	{
		return true;
	}
	
	// same as above
	if((m_length == (at + 5)) && this.StringAt(at, 5, "WATER", "WORTH", ""))
	{
		return true;
	}
			
	// e.g. 'bridgette'
	if((m_length == (at + 3)) && this.StringAt(at, 3, "TTE", "LIA", "NOW", "ROS", "RAS", ""))
	{
		return true;
	}
	
	// e.g. 'olena'
	if((m_length == (at + 2)) && this.StringAt(at, 2, "TA", "TT", "NA", "NO", "NE",
												 "RS", "RE", "LA", "AU", "RO", "RA", ""))
	{
		return true;
	}
	
	// e.g. 'bridget'
	if((m_length == (at + 1)) && this.StringAt(at, 1, "T", "R", ""))
	{
		return true;
	}
	
	return false;
}

/**
 * Exceptions where 'E' is pronounced where it
 * usually wouldn't be, and also some cases
 * where 'LE' transposition rules don't apply
 * and the vowel needs to be encoded here
 *
 * @return true if 'E' pronounced 
 *  
 */
Metaphone3.prototype.E_Pronounced_Exceptions = function()
{
	// greek names e.g. "herakles" or hispanic names e.g. "robles", where 'e' is pronounced, other exceptions
	if((((m_current + 1) == m_last) 
			&& (this.StringAt((m_current - 3), 5, "OCLES", "ACLES", "AKLES", "")
				|| this.StringAt(0, 4, "INES", "")
				|| this.StringAt(0, 5, "LOPES", "ESTES", "GOMES", "NUNES", "ALVES", "ICKES", 
						          "INNES", "PERES", "WAGES", "NEVES", "BENES", "DONES", "")
				|| this.StringAt(0, 6, "CORTES", "CHAVES", "VALDES", "ROBLES", "TORRES", "FLORES", "BORGES", 
								  "NIEVES", "MONTES", "SOARES", "VALLES", "GEDDES", "ANDRES", "VIAJES", 
								  "CALLES", "FONTES", "HERMES", "ACEVES", "BATRES", "MATHES", "")
				|| this.StringAt(0, 7, "DELORES", "MORALES", "DOLORES", "ANGELES", "ROSALES", "MIRELES", "LINARES", 
						          "PERALES", "PAREDES", "BRIONES", "SANCHES", "CAZARES", "REVELES", "ESTEVES", 
								  "ALVARES", "MATTHES", "SOLARES", "CASARES", "CACERES", "STURGES", "RAMIRES", 
								  "FUNCHES", "BENITES", "FUENTES", "PUENTES", "TABARES", "HENTGES", "VALORES", "")
				|| this.StringAt(0, 8, "GONZALES", "MERCEDES", "FAGUNDES", "JOHANNES", "GONSALES", "BERMUDES", 
								  "CESPEDES", "BETANCES", "TERRONES", "DIOGENES", "CORRALES", "CABRALES", 
								  "MARTINES", "GRAJALES", "")
				|| this.StringAt(0, 9, "CERVANTES", "FERNANDES", "GONCALVES", "BENEVIDES", "CIFUENTES", "SIFUENTES",
						  		  "SERVANTES", "HERNANDES", "BENAVIDES", "")
				|| this.StringAt(0, 10, "ARCHIMEDES", "CARRIZALES", "MAGALLANES", "")))
		|| this.StringAt(m_current - 2, 4, "FRED", "DGES", "DRED", "GNES", "")
		|| this.StringAt((m_current - 5), 7, "PROBLEM", "RESPLEN", "")
		|| this.StringAt((m_current - 4), 6, "REPLEN", "")
		|| this.StringAt((m_current - 3), 4, "SPLE", ""))
	{
		return true;
	}
	
	return false;
}

/**
 * Encodes "-UE".
 * 
 * @return true if encoding handled in this routine, false if not
 */
Metaphone3.prototype.Skip_Silent_UE = function()
{
	// always silent except for cases listed below
	if((this.StringAt((m_current - 1), 3, "QUE", "GUE", "") 
		&& !this.StringAt(0, 8, "BARBEQUE", "PALENQUE", "APPLIQUE", "")
		// '-que' cases usually french but missing the acute accent
		&& !this.StringAt(0, 6, "RISQUE", "")
		&& !this.StringAt((m_current - 3), 5, "ARGUE", "SEGUE", "")
		&& !this.StringAt(0, 7, "PIROGUE", "ENRIQUE", "")
		&& !this.StringAt(0, 10, "COMMUNIQUE", ""))
		&& (m_current > 1) 
			&& (((m_current + 1) == m_last) 
				|| this.StringAt(0, 7, "JACQUES", "")))
	{
		m_current = this.SkipVowels(m_current);
		return true;
	}

	return false;
}

/**
 * Encodes 'B'
 * 
 *
 */
Metaphone3.prototype.Encode_B = function()
{
	if(this.Encode_Silent_B())
	{
		return;
	}

	// "-mb", e.g", "dumb", already skipped over under
	// 'M', altho it should really be handled here...
	this.MetaphAddExactApprox("B", "P");

	if((this.GetCharAt(m_current + 1) == 'B')
		|| ((this.GetCharAt(m_current + 1) == 'P')
		&& ((m_current + 1 < m_last) && (this.GetCharAt(m_current + 2) != 'H'))))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encodes silent 'B' for cases not covered under "-mb-"
 * 
 * 
 * @return true if encoding handled in this routine, false if not
 *
*/
Metaphone3.prototype.Encode_Silent_B = function()
{
	//'debt', 'doubt', 'subtle'
	if(this.StringAt((m_current - 2), 4, "DEBT", "") 
		|| this.StringAt((m_current - 2), 5, "SUBTL", "") 
		|| this.StringAt((m_current - 2), 6, "SUBTIL", "") 
		|| this.StringAt((m_current - 3), 5, "DOUBT", ""))
	{
		this.MetaphAdd("T");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes 'C'
 * 
 */
Metaphone3.prototype.Encode_C = function()
{

	if(this.Encode_Silent_C_At_Beginning()
		|| this.Encode_CA_To_S()
		|| this.Encode_CO_To_S()
		|| this.Encode_CH()
		|| this.Encode_CCIA()
		|| this.Encode_CC()
		|| this.Encode_CK_CG_CQ()
		|| this.Encode_C_Front_Vowel()
		|| this.Encode_Silent_C()
		|| this.Encode_CZ()
		|| this.Encode_CS())
	{
		return;
	}

	//else
	if(!this.StringAt((m_current - 1), 1, "C", "K", "G", "Q", ""))
	{
		this.MetaphAdd("K");
	}

	//name sent in 'mac caffrey', 'mac gregor
	if(this.StringAt((m_current + 1), 2, " C", " Q", " G", ""))
	{
		m_current += 2;
	}
	else
	{
		if(this.StringAt((m_current + 1), 1, "C", "K", "Q", "") 
			&& !this.StringAt((m_current + 1), 2, "CE", "CI", ""))
		{
			m_current += 2;
			// account for combinations such as Ro-ckc-liffe
			if(this.StringAt((m_current), 1, "C", "K", "Q", "") 
				&& !this.StringAt((m_current + 1), 2, "CE", "CI", ""))
			{
				m_current++;
			}
		}
		else
		{
			m_current++;
		}
	}
}

/**
 * Encodes cases where 'C' is silent at beginning of word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_C_At_Beginning = function()
{
    //skip these when at start of word
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "CT", "CN", ""))
	{
        m_current += 1;
		return true;
	}

	return false;
}


/**
 * Encodes exceptions where "-CA-" should encode to S
 * instead of K including cases where the cedilla has not been used
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CA_To_S = function()
{
	// Special case: 'caesar'. 
	// Also, where cedilla not used, as in "linguica" => LNKS
	if(((m_current == 0) && this.StringAt(m_current, 4, "CAES", "CAEC", "CAEM", ""))
		|| this.StringAt(0, 8, "FRANCAIS", "FRANCAIX", "LINGUICA", "")
		|| this.StringAt(0, 6, "FACADE", "")
		|| this.StringAt(0, 9, "GONCALVES", "PROVENCAL", ""))
	{
		this.MetaphAdd("S");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encodes exceptions where "-CO-" encodes to S instead of K
 * including cases where the cedilla has not been used
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CO_To_S = function()
{
	// e.g. 'coelecanth' => SLKN0
	if((this.StringAt(m_current, 4, "COEL", "") 
			&& (this.IsVowel(m_current + 4) || ((m_current + 3) == m_last)))
		|| this.StringAt(m_current, 5, "COENA", "COENO", "")
		|| this.StringAt(0, 8, "FRANCOIS", "MELANCON", "")
		|| this.StringAt(0, 6, "GARCON", ""))
	{
		this.MetaphAdd("S");
		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-CH-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CH = function()
{
	if(this.StringAt(m_current, 2, "CH", ""))
	{       
		if(this.Encode_CHAE()
			|| this.Encode_CH_To_H()
			|| this.Encode_Silent_CH()
			|| this.Encode_ARCH()
			// Encode_CH_To_X() should be
			// called before the germanic
			// and greek encoding functions
			|| this.Encode_CH_To_X()
			|| this.Encode_English_CH_To_K()
			|| this.Encode_Germanic_CH_To_K()
			|| this.Encode_Greek_CH_Initial()
			|| this.Encode_Greek_CH_Non_Initial())
		{
			return true;
		}

		if(m_current > 0)
		{
			if(this.StringAt(0, 2, "MC", "") 
					&& (m_current == 1))
			{
				//e.g., "McHugh"
				this.MetaphAdd("K");
			}
			else
			{
				this.MetaphAddWithAlt("X", "K");
			}
		}
		else
		{
			this.MetaphAdd("X");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes "-CHAE-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CHAE = function()
{
	// e.g. 'michael'
	if(((m_current > 0) && this.StringAt((m_current + 2), 2, "AE", "")))
	{
		if(this.StringAt(0, 7, "RACHAEL", ""))
		{
			this.MetaphAdd("X");
		}
		else if(!this.StringAt((m_current - 1), 1, "C", "K", "G", "Q", ""))
		{
			this.MetaphAdd("K");
		}

		this.AdvanceCounter(4, 2);
		return true;
	}

	return false;
}

/**
 * Encdoes transliterations from the hebrew where the
 * sound 'kh' is represented as "-CH-". The normal pronounciation
 * of this in english is either 'h' or 'kh', and alternate
 * spellings most often use "-H-"
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CH_To_H = function()
{
	// hebrew => 'H', e.g. 'channukah', 'chabad'
	if(((m_current == 0) 
		&& (this.StringAt((m_current + 2), 3, "AIM", "ETH", "ELM", "")
		|| this.StringAt((m_current + 2), 4, "ASID", "AZAN", "")
		|| this.StringAt((m_current + 2), 5, "UPPAH", "UTZPA", "ALLAH", "ALUTZ", "AMETZ", "")
		|| this.StringAt((m_current + 2), 6, "ESHVAN", "ADARIM", "ANUKAH", "")
		|| this.StringAt((m_current + 2), 7, "ALLLOTH", "ANNUKAH", "AROSETH", "")))
		// and an irish name with the same encoding
		|| this.StringAt((m_current - 3), 7, "CLACHAN", ""))
	{
		this.MetaphAdd("H");
		this.AdvanceCounter(3, 2);
		return true;
	}

	return false;
}

/**
 * Encodes cases where "-CH-" is not pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_CH = function()
{
	// '-ch-' not pronounced
	if(this.StringAt((m_current - 2), 7, "FUCHSIA", "")
		|| this.StringAt((m_current - 2), 5, "YACHT", "")
		|| this.StringAt(0, 8, "STRACHAN", "")
		|| this.StringAt(0, 8, "CRICHTON", "")
		|| (this.StringAt((m_current - 3), 6, "DRACHM", ""))
			&& !this.StringAt((m_current - 3), 7, "DRACHMA", ""))
	{
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes "-CH-" to X
 * English language patterns
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CH_To_X = function()
{
	// e.g. 'approach', 'beach'
	if((this.StringAt((m_current - 2), 4, "OACH", "EACH", "EECH", "OUCH", "OOCH", "MUCH", "SUCH", "")
			&& !this.StringAt((m_current - 3), 5, "JOACH", ""))
		// e.g. 'dacha', 'macho'
		|| (((m_current + 2) == m_last ) && this.StringAt((m_current - 1), 4, "ACHA", "ACHO", ""))
		|| (this.StringAt(m_current, 4, "CHOT", "CHOD", "CHAT", "") && ((m_current + 3) == m_last))
		|| ((this.StringAt((m_current - 1), 4, "OCHE", "") && ((m_current + 2) == m_last))
				&& !this.StringAt((m_current - 2), 5, "DOCHE", ""))		
		|| this.StringAt((m_current - 4), 6, "ATTACH", "DETACH", "KOVACH", "")
		|| this.StringAt((m_current - 5), 7, "SPINACH", "")
		|| this.StringAt(0, 6, "MACHAU", "")
		|| this.StringAt((m_current - 4), 8, "PARACHUT", "")
		|| this.StringAt((m_current - 5), 8, "MASSACHU", "")
		|| (this.StringAt((m_current - 3), 5, "THACH", "") && !this.StringAt((m_current - 1), 4, "ACHE", ""))
		|| this.StringAt((m_current - 2), 6, "VACHON", "") )
	{
		this.MetaphAdd("X");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes "-CH-" to K in contexts of
 * initial "A" or "E" follwed by "CH"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_English_CH_To_K = function()
{
	//'ache', 'echo', alternate spelling of 'michael'
	if(((m_current == 1) && this.RootOrInflections(m_inWord, "ACHE"))
		|| (((m_current > 3) && this.RootOrInflections(m_inWord.substring(m_current - 1), "ACHE"))
			&& (this.StringAt(0, 3, "EAR", "")
				|| this.StringAt(0, 4, "HEAD", "BACK", "")
				|| this.StringAt(0, 5, "HEART", "BELLY", "TOOTH", "")))
		|| this.StringAt((m_current - 1), 4, "ECHO", "")
		|| this.StringAt((m_current - 2), 7, "MICHEAL", "")
		|| this.StringAt((m_current - 4), 7, "JERICHO", "")
		|| this.StringAt((m_current - 5), 7, "LEPRECH", ""))
	{
		this.MetaphAddWithAlt("K", "X");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes "-CH-" to K in mostly germanic context
 * of internal "-ACH-", with exceptions
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Germanic_CH_To_K = function()
{
	// various germanic
	// "<consonant><vowel>CH-"implies a german word where 'ch' => K
	if(((m_current > 1)
		&& !this.IsVowel(m_current - 2) 
		&& this.StringAt((m_current - 1), 3, "ACH", "")
		&& !this.StringAt((m_current - 2), 7, "MACHADO", "MACHUCA", "LACHANC", "LACHAPE", "KACHATU", "")
		&& !this.StringAt((m_current - 3), 7, "KHACHAT", "")
		&& ((this.GetCharAt(m_current + 2) != 'I') 
			&& ((this.GetCharAt(m_current + 2) != 'E')
			|| this.StringAt((m_current - 2), 6, "BACHER", "MACHER", "MACHEN", "LACHER", "")) )
					// e.g. 'brecht', 'fuchs'
			|| (this.StringAt((m_current + 2), 1, "T", "S", "") 
					&& !(this.StringAt(0, 11, "WHICHSOEVER", "") || this.StringAt(0, 9, "LUNCHTIME", "") ))
					// e.g. 'andromache'
			|| this.StringAt(0, 4, "SCHR", "")
			|| ((m_current > 2) && this.StringAt((m_current - 2), 5, "MACHE", ""))
			|| ((m_current == 2) && this.StringAt((m_current - 2), 4, "ZACH", ""))
			|| this.StringAt((m_current - 4), 6, "SCHACH", "")
			|| this.StringAt((m_current - 1), 5, "ACHEN", "")
			|| this.StringAt((m_current - 3), 5, "SPICH", "ZURCH", "BUECH", "")
			|| (this.StringAt((m_current - 3), 5, "KIRCH", "JOACH", "BLECH", "MALCH", "")
					// "kirch" and "blech" both get 'X'
					&& !(this.StringAt((m_current - 3), 8, "KIRCHNER", "") || ((m_current + 1) == m_last)))
			|| (((m_current + 1) == m_last) && this.StringAt((m_current - 2), 4, "NICH", "LICH", "BACH", ""))
			|| (((m_current + 1) == m_last) 
					&& this.StringAt((m_current - 3), 5, "URICH", "BRICH", "ERICH", "DRICH", "NRICH", "")
					&& !this.StringAt((m_current - 5), 7, "ALDRICH", "") 
					&& !this.StringAt((m_current - 6), 8, "GOODRICH", "")
					&& !this.StringAt((m_current - 7), 9, "GINGERICH", "")))
			|| (((m_current + 1) == m_last) && this.StringAt((m_current - 4), 6, "ULRICH", "LFRICH", "LLRICH", 
																			"EMRICH", "ZURICH", "EYRICH", ""))
		// e.g., 'wachtler', 'wechsler', but not 'tichner'
		|| ((this.StringAt((m_current - 1), 1, "A", "O", "U", "E", "") || (m_current == 0)) 
					&& this.StringAt((m_current + 2), 1, "L", "R", "N", "M", "B", "H", "F", "V", "W", " ", "")))
	{       
		// "CHR/L-" e.g. 'chris' do not get
		// alt pronunciation of 'X'
		if(this.StringAt((m_current + 2), 1, "R", "L", "")
			|| this.SlavoGermanic())
		{
			this.MetaphAdd("K");
		}
		else
		{
			this.MetaphAddWithAlt("K", "X");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-ARCH-". Some occurances are from greek roots and therefore encode
 * to 'K', others are from english words and therefore encode to 'X'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ARCH = function()
{
	if(this.StringAt((m_current - 2), 4, "ARCH", ""))
	{
		// "-ARCH-" has many combining forms where "-CH-" => K because of its
		// derivation from the greek
		if(((this.IsVowel(m_current + 2) && this.StringAt((m_current - 2), 5, "ARCHA", "ARCHI", "ARCHO", "ARCHU", "ARCHY", ""))
			|| this.StringAt((m_current - 2), 6, "ARCHEA", "ARCHEG", "ARCHEO", "ARCHET", "ARCHEL", "ARCHES", "ARCHEP", 
											"ARCHEM", "ARCHEN", "")
			|| (this.StringAt((m_current - 2), 4, "ARCH", "") && (((m_current + 1) == m_last)))
			|| this.StringAt(0, 7, "MENARCH", ""))
			&& (!this.RootOrInflections(m_inWord, "ARCH")
				&& !this.StringAt((m_current - 4), 6, "SEARCH", "POARCH", "")
				&& !this.StringAt(0, 9, "ARCHENEMY", "ARCHIBALD", "ARCHULETA", "ARCHAMBAU", "")
				&& !this.StringAt(0, 6, "ARCHER", "ARCHIE", "") 
				&& !((((this.StringAt((m_current - 3), 5, "LARCH", "MARCH", "PARCH", "")
						|| this.StringAt((m_current - 4), 6, "STARCH", ""))
						&& !(this.StringAt(0, 6, "EPARCH", "")
								|| this.StringAt(0, 7, "NOMARCH", "")
								|| this.StringAt(0, 8, "EXILARCH", "HIPPARCH", "MARCHESE", "")
								|| this.StringAt(0, 9, "ARISTARCH", "")
								|| this.StringAt(0, 9, "MARCHETTI", "")) )
						|| this.RootOrInflections(m_inWord, "STARCH"))
						&& (!this.StringAt((m_current - 2), 5, "ARCHU", "ARCHY", "")
								|| this.StringAt(0, 7, "STARCHY", ""))))) 
		{
			this.MetaphAddWithAlt("K", "X");
		}
		else
		{
			this.MetaphAdd("X");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-CH-" to K when from greek roots
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Greek_CH_Initial = function()
{
	// greek roots e.g. 'chemistry', 'chorus', ch at beginning of root
	if((this.StringAt(m_current, 6, "CHAMOM", "CHARAC", "CHARIS", "CHARTO", "CHARTU", "CHARYB", "CHRIST", "CHEMIC", "CHILIA", "") 
		|| (this.StringAt(m_current, 5, "CHEMI", "CHEMO", "CHEMU", "CHEMY", "CHOND", "CHONA", "CHONI", "CHOIR", "CHASM", 
								   "CHARO", "CHROM", "CHROI", "CHAMA", "CHALC", "CHALD", "CHAET","CHIRO", "CHILO", "CHELA", "CHOUS", 
								   "CHEIL", "CHEIR", "CHEIM", "CHITI", "CHEOP", "")
			&& !(this.StringAt(m_current, 6, "CHEMIN", "") || this.StringAt((m_current - 2), 8, "ANCHONDO", "")))
		|| (this.StringAt(m_current, 5, "CHISM", "CHELI", "")
		// exclude spanish "machismo"
			&& !(this.StringAt(0, 8, "MACHISMO", "")
			// exclude some french words
				|| this.StringAt(0, 10, "REVANCHISM", "")
				|| this.StringAt(0, 9, "RICHELIEU", "")
				|| (this.StringAt(0, 5, "CHISM", "") && (m_length == 5))
				|| this.StringAt(0, 6, "MICHEL", "")))
		// include e.g. "chorus", "chyme", "chaos"
		|| (this.StringAt(m_current, 4, "CHOR", "CHOL", "CHYM", "CHYL", "CHLO", "CHOS", "CHUS", "CHOE", "")
				&& !this.StringAt(0, 6, "CHOLLO", "CHOLLA", "CHORIZ", ""))
		// "chaos" => K but not "chao"
		|| (this.StringAt(m_current, 4, "CHAO", "") && ((m_current + 3) != m_last))
		// e.g. "abranchiate"
		|| (this.StringAt(m_current, 4, "CHIA", "")  && !(this.StringAt(0, 10, "APPALACHIA", "") || this.StringAt(0, 7, "CHIAPAS", "")))
		// e.g. "chimera"
		|| this.StringAt(m_current, 7, "CHIMERA", "CHIMAER", "CHIMERI", "") 
		// e.g. "chameleon"
		|| ((m_current == 0) && this.StringAt(m_current, 5, "CHAME", "CHELO", "CHITO", "") )
		// e.g. "spirochete"
		|| ((((m_current + 4) == m_last) || ((m_current + 5) == m_last)) && this.StringAt((m_current - 1), 6, "OCHETE", "")))
		// more exceptions where "-CH-" => X e.g. "chortle", "crocheter"
			&& !((this.StringAt(0, 5, "CHORE",  "CHOLO", "CHOLA", "") && (m_length == 5))
				|| this.StringAt(m_current, 5, "CHORT", "CHOSE", "")
				|| this.StringAt((m_current - 3), 7, "CROCHET", "")
				|| this.StringAt(0, 7, "CHEMISE", "CHARISE", "CHARISS", "CHAROLE", "")) )
	{
		// "CHR/L-" e.g. 'christ', 'chlorine' do not get
		// alt pronunciation of 'X'
		if(this.StringAt((m_current + 2), 1, "R", "L", "")
				|| this.SlavoGermanic())
		{
			this.MetaphAdd("K");
		}
		else
		{
			this.MetaphAddWithAlt("K", "X");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode a variety of greek and some german roots where "-CH-" => K
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Greek_CH_Non_Initial = function()
{
	//greek & other roots e.g. 'tachometer', 'orchid', ch in middle or end of root
	if(this.StringAt((m_current - 2), 6, "ORCHID", "NICHOL", "MECHAN", "LICHEN", "MACHIC", "PACHEL", "RACHIF", "RACHID", 
									"RACHIS", "RACHIC", "MICHAL", "")
		|| this.StringAt((m_current - 3), 5, "MELCH", "GLOCH", "TRACH", "TROCH", "BRACH", "SYNCH", "PSYCH", 
										"STICH", "PULCH", "EPOCH", "")
		|| (this.StringAt((m_current - 3), 5, "TRICH", "") && !this.StringAt((m_current - 5), 7, "OSTRICH", ""))
		|| (this.StringAt((m_current - 2), 4, "TYCH", "TOCH", "BUCH", "MOCH", "CICH", "DICH", "NUCH", "EICH", "LOCH", 
										 "DOCH", "ZECH", "WYCH", "")
			&& !(this.StringAt((m_current - 4), 9, "INDOCHINA", "") || this.StringAt((m_current - 2), 6, "BUCHON", "")))
		|| this.StringAt((m_current - 2), 5, "LYCHN", "TACHO", "ORCHO", "ORCHI", "LICHO", "")
		|| (this.StringAt((m_current - 1), 5, "OCHER", "ECHIN", "ECHID", "") && ((m_current == 1) || (m_current == 2)))
		|| this.StringAt((m_current - 4), 6, "BRONCH", "STOICH", "STRYCH", "TELECH", "PLANCH", "CATECH", "MANICH", "MALACH", 
										"BIANCH", "DIDACH", "")
		|| (this.StringAt((m_current - 1), 4, "ICHA", "ICHN","") && (m_current == 1))
		|| this.StringAt((m_current - 2), 8, "ORCHESTR", "")
		|| this.StringAt((m_current - 4), 8, "BRANCHIO", "BRANCHIF", "")
		|| (this.StringAt((m_current - 1), 5, "ACHAB", "ACHAD", "ACHAN", "ACHAZ", "")
			&& !this.StringAt((m_current - 2), 7, "MACHADO", "LACHANC", ""))
		|| this.StringAt((m_current - 1), 6, "ACHISH", "ACHILL", "ACHAIA", "ACHENE", "")
		|| this.StringAt((m_current - 1), 7, "ACHAIAN", "ACHATES", "ACHIRAL", "ACHERON", "")
		|| this.StringAt((m_current - 1), 8, "ACHILLEA", "ACHIMAAS", "ACHILARY", "ACHELOUS", "ACHENIAL", "ACHERNAR", "")
		|| this.StringAt((m_current - 1), 9, "ACHALASIA", "ACHILLEAN", "ACHIMENES", "")
		|| this.StringAt((m_current - 1), 10, "ACHIMELECH", "ACHITOPHEL", "")
		// e.g. 'inchoate'
		|| (((m_current - 2) == 0) && (this.StringAt((m_current - 2), 6, "INCHOA", "")
		// e.g. 'ischemia'
		|| this.StringAt(0, 4, "ISCH", "")) )
		// e.g. 'ablimelech', 'antioch', 'pentateuch'
		|| (((m_current + 1) == m_last) && this.StringAt((m_current - 1), 1, "A", "O", "U", "E", "") 
			&& !(this.StringAt(0, 7, "DEBAUCH", "")
					|| this.StringAt((m_current - 2), 4, "MUCH", "SUCH", "KOCH", "")
					|| this.StringAt((m_current - 5), 7, "OODRICH", "ALDRICH", ""))))
	{
		this.MetaphAddWithAlt("K", "X");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes reliably italian "-CCIA-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CCIA = function()
{
	//e.g., 'focaccia'
	if(this.StringAt((m_current + 1), 3, "CIA", ""))
	{
		this.MetaphAddWithAlt("X", "S");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-CC-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CC = function()
{
	//double 'C', but not if e.g. 'McClellan'
	if(this.StringAt(m_current, 2, "CC", "") && !((m_current == 1) && (this.GetCharAt(0) == 'M')))
	{
		// exception
		if (this.StringAt((m_current - 3), 7, "FLACCID", ""))
		{
			this.MetaphAdd("S");
			this.AdvanceCounter(3, 2);
			return true;
		}

		//'bacci', 'bertucci', other italian
		if((((m_current + 2) == m_last) && this.StringAt((m_current + 2), 1, "I", ""))
			|| this.StringAt((m_current + 2), 2, "IO", "")
			|| (((m_current + 4) == m_last) && this.StringAt((m_current + 2), 3, "INO", "INI", "")))
		{
			this.MetaphAdd("X");
			this.AdvanceCounter(3, 2);
			return true;
		}

		//'accident', 'accede' 'succeed'
		if(this.StringAt((m_current + 2), 1, "I", "E", "Y", "")
			//except 'bellocchio','bacchus', 'soccer' get K
			&& !((this.GetCharAt(m_current + 2) == 'H') 
				|| this.StringAt((m_current - 2), 6, "SOCCER", "")))
		{
			this.MetaphAdd("KS");
			this.AdvanceCounter(3, 2);
			return true;

		}
		else
		{
			//Pierce's rule
			this.MetaphAdd("K");
			m_current += 2;
			return true;
		}
	}

	return false;
}

/**
 * Encode cases where the consonant following "C" is redundant
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CK_CG_CQ = function()
{
	if(this.StringAt(m_current, 2, "CK", "CG", "CQ", ""))
	{
		// eastern european spelling e.g. 'gorecki' == 'goresky'
		if(this.StringAt(m_current, 3, "CKI", "CKY", "") 
			&& ((m_current + 2) == m_last)
			&& (m_length > 6))
		{
			this.MetaphAddWithAlt("K", "SK");
		}
		else
		{
			this.MetaphAdd("K");
		}
		m_current += 2;

		if(this.StringAt(m_current, 1, "K", "G", "Q", ""))
		{
			m_current++;
		}
		return true;
	}

	return false;
}

/**
 * Encode cases where "C" preceeds a front vowel such as "E", "I", or "Y".
 * These cases most likely => S or X
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_C_Front_Vowel = function()
{
	if(this.StringAt(m_current, 2, "CI", "CE", "CY", ""))
	{
		if(this.Encode_British_Silent_CE()
			|| this.Encode_CE()
			|| this.Encode_CI()
			|| this.Encode_Latinate_Suffixes())
		{
			this.AdvanceCounter(2, 1);
			return true;
		}

		this.MetaphAdd("S");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_British_Silent_CE = function()
{
	// english place names like e.g.'gloucester' pronounced glo-ster
	if((this.StringAt((m_current + 1), 5, "ESTER", "") && ((m_current + 5) == m_last))
		|| this.StringAt((m_current + 1), 10, "ESTERSHIRE", ""))
	{
		return true;
	}

	return false;
}

/**
 *  
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CE = function()
{
	// 'ocean', 'commercial', 'provincial', 'cello', 'fettucini', 'medici'
	if((this.StringAt((m_current + 1), 3, "EAN", "") && this.IsVowel(m_current - 1))
		// e.g. 'rosacea'
		|| (this.StringAt((m_current - 1), 4, "ACEA", "") 
			&& ((m_current + 2) == m_last)
			&& !this.StringAt(0, 7, "PANACEA", ""))
		// e.g. 'botticelli', 'concerto'
		|| this.StringAt((m_current + 1), 4, "ELLI", "ERTO", "EORL", "") 
		// some italian names familiar to americans
		|| (this.StringAt((m_current - 3), 5, "CROCE", "") && ((m_current + 1) == m_last)) 
		|| this.StringAt((m_current - 3), 5, "DOLCE", "") 
		|| this.StringAt((m_current - 5), 7, "VERSACE", "") 
		// e.g. 'cello'
		|| (this.StringAt((m_current + 1), 4, "ELLO", "") 
			&& ((m_current + 4) == m_last)))
	{
		this.MetaphAddWithAlt("X", "S");
		return true;
	}

	return false;
}

/**
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CI = function()
{
	// with consonant before C
	// e.g. 'fettucini', but exception for the americanized pronunciation of 'mancini'
	if(((this.StringAt((m_current + 1), 3, "INI", "") && !this.StringAt(0, 7, "MANCINI", "")) && ((m_current + 3) == m_last))
		// e.g. 'medici'
		|| (this.StringAt((m_current - 1), 3, "ICI", "") && ((m_current + 1) == m_last))
		// e.g. "commercial', 'provincial', 'cistercian'
		|| this.StringAt((m_current - 1), 5, "RCIAL", "NCIAL", "RCIAN", "UCIUS", "")
		// special cases
		|| this.StringAt((m_current - 3), 6, "MARCIA", "")
		|| this.StringAt((m_current - 2), 7, "ANCIENT", ""))
	{
		this.MetaphAddWithAlt("X", "S");
		return true;
	}

	// with vowel before C (or at beginning?)
	if(((this.StringAt(m_current, 3, "CIO", "CIE", "CIA", "")
		&& this.IsVowel(m_current - 1))
		// e.g. "ciao"
		|| this.StringAt((m_current + 1), 3, "IAO", ""))
		&& !this.StringAt((m_current - 4), 8, "COERCION", ""))
	{			
		if((this.StringAt(m_current, 4, "CIAN", "CIAL", "CIAO", "CIES", "CIOL", "CION", "")
			// exception - "glacier" => 'X' but "spacier" = > 'S'
			|| this.StringAt((m_current - 3), 7, "GLACIER", "")
			|| this.StringAt(m_current, 5, "CIENT", "CIENC", "CIOUS", "CIATE", "CIATI", "CIATO", "CIABL", "CIARY", "")
			|| (((m_current + 2) == m_last) && this.StringAt(m_current, 3, "CIA", "CIO", ""))
			|| (((m_current + 3) == m_last) && this.StringAt(m_current, 4, "CIAS", "CIOS", "")))
			// exceptions
			&& !(this.StringAt((m_current - 4), 11, "ASSOCIATION", "")
				|| this.StringAt(0, 4, "OCIE", "")
				// exceptions mostly because these names are usually from 
				// the spanish rather than the italian in america
				|| this.StringAt((m_current - 2), 5, "LUCIO", "")
				|| this.StringAt((m_current - 2), 6, "MACIAS", "")
				|| this.StringAt((m_current - 3), 6, "GRACIE", "GRACIA", "")  
				|| this.StringAt((m_current - 2), 7, "LUCIANO", "") 
				|| this.StringAt((m_current - 3), 8, "MARCIANO", "")
				|| this.StringAt((m_current - 4), 7, "PALACIO", "") 					
				|| this.StringAt((m_current - 4), 9, "FELICIANO", "") 
				|| this.StringAt((m_current - 5), 9, "JUSTICIAR", "") 
				|| this.StringAt((m_current - 5), 8, "MAURICIO", "") 
				|| this.StringAt((m_current - 7), 11, "ENCARNACION", "")
				|| this.StringAt((m_current - 4), 8, "POLICIES", "")
				|| this.StringAt((m_current - 2), 8, "HACIENDA", "")
				|| this.StringAt((m_current - 6), 9, "ANDALUCIA", "")
				|| this.StringAt((m_current - 2), 5, "SOCIO", "SOCIE", "")))
		{
			this.MetaphAddWithAlt("X", "S");
		}
		else
		{
			this.MetaphAddWithAlt("S", "X");
		}
		
		return true;
	}
	
	// exception
	if(this.StringAt((m_current - 4), 8, "COERCION", ""))
	{
		this.MetaphAdd("J");
		return true;
	}

	return false;
}

/**
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Latinate_Suffixes = function()
{
	if(this.StringAt((m_current + 1), 4, "EOUS", "IOUS", ""))
	{
		this.MetaphAddWithAlt("X", "S");
		return true;
	}

	return false;
}

/**
 * Encodes some exceptions where "C" is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_C = function()
{
	if(this.StringAt((m_current + 1), 1, "T", "S", ""))
	{
		if (this.StringAt(0, 11, "CONNECTICUT", "") 
			|| this.StringAt(0, 6, "INDICT", "TUCSON", ""))
		{       
			m_current++;
			return true;
		}
	}

	return false;
}

/**
 * Encodes slavic spellings or transliterations
 * written as "-CZ-"
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CZ = function()
{
	if(this.StringAt((m_current + 1), 1, "Z", "")
		&& !this.StringAt((m_current - 1), 6, "ECZEMA", ""))
	{
		if(this.StringAt(m_current, 4, "CZAR", ""))
		{
			this.MetaphAdd("S");
		}
		// otherwise most likely a czech word...
		else
		{
			this.MetaphAdd("X");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * "-CS" special cases
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_CS = function()
{
	// give an 'etymological' 2nd
	// encoding for "kovacs" so
	// that it matches "kovach"
	if(this.StringAt(0, 6, "KOVACS", ""))
	{
		this.MetaphAddWithAlt("KS", "X");
		m_current += 2;
		return true;
	}

	if(this.StringAt((m_current - 1), 3, "ACS", "")
		&& ((m_current + 1) == m_last)
		&& !this.StringAt((m_current - 4), 6, "ISAACS", ""))
	{
		this.MetaphAdd("X");
		m_current += 2;
		return true;
	}
	
	return false;
}

/**
 * Encode "-D-"
 * 
 */
Metaphone3.prototype.Encode_D = function()
{
	if(this.Encode_DG()
		|| this.Encode_DJ()
		|| this.Encode_DT_DD()
		|| this.Encode_D_To_J()
		|| this.Encode_DOUS()
		|| this.Encode_Silent_D())
	{
		return;
	}

	if(m_encodeExact)
	{
		// "final de-voicing" in this case
		// e.g. 'missed' == 'mist'
		if((m_current == m_last)
			&& this.StringAt((m_current - 3), 4, "SSED", ""))
		{
			this.MetaphAdd("T");
		}
		else
		{
			this.MetaphAdd("D");
		}
	}
	else
	{
		this.MetaphAdd("T");
	}
	m_current++;
}

/**
 * Encode "-DG-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_DG = function()
{
	if(this.StringAt(m_current, 2, "DG", ""))
	{
		// excludes exceptions e.g. 'edgar', 
		// or cases where 'g' is first letter of combining form 
		// e.g. 'handgun', 'waldglas'
		if(this.StringAt((m_current + 2), 1, "A", "O", "")
			// e.g. "midgut"
			|| this.StringAt((m_current + 1), 3, "GUN", "GUT", "")
			// e.g. "handgrip"
			|| this.StringAt((m_current + 1), 4, "GEAR", "GLAS", "GRIP", "GREN", "GILL", "GRAF", "")
			// e.g. "mudgard"
			|| this.StringAt((m_current + 1), 5, "GUARD", "GUILT", "GRAVE", "GRASS", "")
			// e.g. "woodgrouse"
			|| this.StringAt((m_current + 1), 6, "GROUSE", ""))
		{
			this.MetaphAddExactApprox("DG", "TK");
		}
		else
		{
			//e.g. "edge", "abridgment"
			this.MetaphAdd("J");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-DJ-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_DJ = function()
{
	// e.g. "adjacent"
	if(this.StringAt(m_current, 2, "DJ", ""))
	{
		this.MetaphAdd("J");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-DD-" and "-DT-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_DT_DD = function()
{
	// eat redundant 'T' or 'D'
	if(this.StringAt(m_current, 2, "DT", "DD", ""))
	{
		if(this.StringAt(m_current, 3, "DTH",  ""))
		{
			this.MetaphAddExactApprox("D0", "T0");
			m_current += 3;
		}
		else
		{
			if(m_encodeExact)
			{
				// devoice it
				if(this.StringAt(m_current, 2, "DT", ""))
				{
					this.MetaphAdd("T");
				}
				else
				{
					this.MetaphAdd("D");
				}						
			}
			else
			{
				this.MetaphAdd("T");
			}
			m_current += 2;
		}
		return true;
	}

	return false;
}

/**
 * Encode cases where "-DU-" "-DI-", and "-DI-" => J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_D_To_J = function()
{
	// e.g. "module", "adulate"
	if((this.StringAt(m_current, 3, "DUL", "") 
			&& (this.IsVowel(m_current - 1) && this.IsVowel(m_current + 3)))
		// e.g. "soldier", "grandeur", "procedure"
		|| (((m_current + 3) == m_last) 
			&& this.StringAt((m_current - 1) , 5, "LDIER", "NDEUR", "EDURE", "RDURE", ""))
		|| this.StringAt((m_current - 3), 7, "CORDIAL", "")
		// e.g.  "pendulum", "education"
		|| this.StringAt((m_current - 1), 5, "NDULA", "NDULU", "EDUCA", "")
		// e.g. "individual", "individual", "residuum"
		|| this.StringAt((m_current - 1), 4, "ADUA", "IDUA", "IDUU", ""))
	{
        this.MetaphAddExactApprox4("J", "D", "J", "T");
        this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode latinate suffix "-DOUS" where 'D' is pronounced as J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_DOUS = function()
{
	// e.g. "assiduous", "arduous"
	if(this.StringAt((m_current + 1), 4, "UOUS", ""))
	{
		this.MetaphAddExactApprox4("J", "D", "J", "T");
		this.AdvanceCounter(4, 1);
		return true;
	}

	return false;
}

/**
 * Encode silent "-D-"
 * 
 * @return true if encoding handled in this routine, false if not
 *	 
 */
Metaphone3.prototype.Encode_Silent_D = function()
{
	// silent 'D' e.g. 'wednesday', 'handsome'
	if(this.StringAt((m_current - 2), 9, "WEDNESDAY", "")
		|| this.StringAt((m_current - 3), 7, "HANDKER", "HANDSOM", "WINDSOR", "")
		// french silent D at end in words or names familiar to americans
		|| this.StringAt((m_current - 5), 6, "PERNOD", "ARTAUD", "RENAUD", "")
		|| this.StringAt((m_current - 6), 7, "RIMBAUD", "MICHAUD", "BICHAUD", "")
		|| this.StringAt((m_current + 1), 2, "ZH", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-F-"
 * 
 */
Metaphone3.prototype.Encode_F = function()
{
	// Encode cases where "-FT-" => "T" is usually silent
	// e.g. 'often', 'soften'
	// This should really be covered under "T"!
	if(this.StringAt((m_current - 1), 5, "OFTEN", ""))
	{
		this.MetaphAddWithAlt("F", "FT");
		m_current += 2;
		return;
	}

	// eat redundant 'F'
	if(this.GetCharAt(m_current + 1) == 'F')
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}

	this.MetaphAdd("F");

}

/**
 * Encode "-G-"
 * 
 */
Metaphone3.prototype.Encode_G = function()
{
	if(this.Encode_Silent_G_At_Beginning()
		|| this.Encode_GG()
		|| this.Encode_GK()
		|| this.Encode_GH()
		|| this.Encode_Silent_G()
		|| this.Encode_GN()
		|| this.Encode_GL()
		|| this.Encode_Initial_G_Front_Vowel()
		|| this.Encode_NGER()
		|| this.Encode_GER()
		|| this.Encode_GEL()
		|| this.Encode_Non_Initial_G_Front_Vowel()
		|| this.Encode_GA_To_J())
	{
		return;
	}

	if(!this.StringAt((m_current - 1), 1, "C", "K", "G", "Q", ""))
	{
		this.MetaphAddExactApprox("G", "K");
	}

	m_current++;
}

/**
 * Encode cases where 'G' is silent at beginning of word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_G_At_Beginning = function()
{    
	//skip these when at start of word
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "GN", ""))
	{
        m_current += 1;
		return true;
	}

	return false;
}

/**
 * Encode "-GG-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GG = function()
{
	if(this.GetCharAt(m_current + 1) == 'G')
	{
		// italian e.g, 'loggia', 'caraveggio', also 'suggest' and 'exaggerate'
		if(this.StringAt((m_current - 1), 5, "AGGIA", "OGGIA", "AGGIO", "EGGIO", "EGGIA", "IGGIO", "")
			// 'ruggiero' but not 'snuggies'
			|| (this.StringAt((m_current - 1), 5, "UGGIE", "") && !(((m_current + 3) == m_last) || ((m_current + 4) == m_last)))
			|| (((m_current + 2) == m_last) && this.StringAt((m_current - 1), 4, "AGGI", "OGGI", ""))
			|| this.StringAt((m_current - 2), 6, "SUGGES", "XAGGER", "REGGIE", ""))
		{
			// expection where "-GG-" => KJ
			if (this.StringAt((m_current - 2), 7, "SUGGEST", ""))
			{
				this.MetaphAddExactApprox("G", "K");
			}

			this.MetaphAdd("J");
			this.AdvanceCounter(3, 2);
		}
		else
		{
			this.MetaphAddExactApprox("G", "K");
			m_current += 2;
		}
		return true;
	}
	
	return false;
}

/**
 * Encode "-GK-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GK = function()
{
	// 'gingko'
	if(this.GetCharAt(m_current + 1) == 'K')
	{
		this.MetaphAdd("K");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-GH-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH = function()
{
	if(this.GetCharAt(m_current + 1) == 'H')
	{
		if(this.Encode_GH_After_Consonant()
			|| this.Encode_Initial_GH()
			|| this.Encode_GH_To_J()
			|| this.Encode_GH_To_H()
			|| this.Encode_UGHT()
			|| this.Encode_GH_H_Part_Of_Other_Word()
			|| this.Encode_Silent_GH()
			|| this.Encode_GH_To_F())
		{
			return true;
		}

		this.MetaphAddExactApprox("G", "K");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_After_Consonant = function()
{
	// e.g. 'burgher', 'bingham'
	if((m_current > 0) 
		&& !this.IsVowel(m_current - 1)
		// not e.g. 'greenhalgh'
		&& !(this.StringAt((m_current - 3), 5, "HALGH", "") 
				&& ((m_current + 1) == m_last)))
	{
		this.MetaphAddExactApprox("G", "K");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_GH = function()
{
	if(m_current < 3)
	{
		// e.g. "ghislane", "ghiradelli"
		if(m_current == 0)
		{ 
			if(this.GetCharAt(m_current + 2) == 'I')
			{
				this.MetaphAdd("J");
			}
			else
			{
				this.MetaphAddExactApprox("G", "K");
			}
			m_current += 2;
			return true;
		}
	}

	return false;
}


/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_To_J = function()
{
	// e.g., 'greenhalgh', 'dunkenhalgh', english names
	if(this.StringAt((m_current - 2), 4, "ALGH", "") && ((m_current + 1) == m_last))
	{
		this.MetaphAddWithAlt("J", "");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_To_H = function()
{
	// special cases
	// e.g., 'donoghue', 'donaghy'
	if((this.StringAt((m_current - 4), 4, "DONO", "DONA", "") && this.IsVowel(m_current + 2))
		|| this.StringAt((m_current - 5), 9, "CALLAGHAN", ""))
	{
		this.MetaphAdd("H");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_UGHT = function()
{
	//e.g. "ought", "aught", "daughter", "slaughter"    
	if(this.StringAt((m_current - 1), 4, "UGHT", ""))
	{
		if ((this.StringAt((m_current - 3), 5, "LAUGH", "")
			&& !(this.StringAt((m_current - 4), 7, "SLAUGHT", "")
				|| this.StringAt((m_current - 3), 7, "LAUGHTO", "")))
				|| this.StringAt((m_current - 4), 6, "DRAUGH", ""))
		{
			this.MetaphAdd("FT");
		}
		else
		{
			this.MetaphAdd("T");
		}
		m_current += 3;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_H_Part_Of_Other_Word = function()
{
	// if the 'H' is the beginning of another word or syllable
	if (this.StringAt((m_current + 1), 4, "HOUS", "HEAD", "HOLE", "HORN", "HARN", ""))
	{
		this.MetaphAddExactApprox("G", "K");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_GH = function()
{
	//Parker's rule (with some further refinements) - e.g., 'hugh'
	if(((((m_current > 1) && this.StringAt((m_current - 2), 1, "B", "H", "D", "G", "L", "") )
		//e.g., 'bough'
		|| ((m_current > 2) 
			&& this.StringAt((m_current - 3), 1, "B", "H", "D", "K", "W", "N", "P", "V", "")
			&& !this.StringAt(0, 6, "ENOUGH", ""))
		//e.g., 'broughton'
		|| ((m_current > 3) && this.StringAt((m_current - 4), 1, "B", "H", "") )
		//'plough', 'slaugh'
		|| ((m_current > 3) && this.StringAt((m_current - 4), 2, "PL", "SL", "") )  
		|| ((m_current > 0) 
				// 'sigh', 'light'
				&& ((this.GetCharAt(m_current - 1) == 'I')
					|| this.StringAt(0, 4, "PUGH", "")
					// e.g. 'MCDONAGH', 'MURTAGH', 'CREAGH'
					|| (this.StringAt((m_current - 1), 3, "AGH", "") 
							&& ((m_current + 1) == m_last))
					|| this.StringAt((m_current - 4), 6, "GERAGH", "DRAUGH", "")
					|| (this.StringAt((m_current - 3), 5, "GAUGH", "GEOGH", "MAUGH", "")
							&& !this.StringAt(0, 9, "MCGAUGHEY", ""))
					// exceptions to 'tough', 'rough', 'lough'
					|| (this.StringAt((m_current - 2), 4, "OUGH", "") 
							&& (m_current > 3) 
							&& !this.StringAt((m_current - 4), 6, "CCOUGH", "ENOUGH", "TROUGH", "CLOUGH", "")))))
		// suffixes starting w/ vowel where "-GH-" is usually silent
		&& (this.StringAt((m_current - 3), 5, "VAUGH", "FEIGH", "LEIGH", "")
			|| this.StringAt((m_current - 2), 4, "HIGH", "TIGH", "")
			|| ((m_current + 1) == m_last)
			|| (this.StringAt((m_current + 2), 2, "IE", "EY", "ES", "ER", "ED", "TY", "") 
				&& ((m_current + 3) == m_last)
				&& !this.StringAt((m_current - 5), 9, "GALLAGHER", ""))
			|| (this.StringAt((m_current + 2), 1, "Y", "") && ((m_current + 2) == m_last))
			|| (this.StringAt((m_current + 2), 3, "ING", "OUT", "") && ((m_current + 4) == m_last))
			|| (this.StringAt((m_current + 2), 4, "ERTY", "") && ((m_current + 5) == m_last))
			|| (!this.IsVowel(m_current + 2) 
					|| this.StringAt((m_current - 3), 5, "GAUGH", "GEOGH", "MAUGH", "")
					|| this.StringAt((m_current - 4), 8, "BROUGHAM", ""))))
		// exceptions where '-g-' pronounced
		&& !(this.StringAt(0, 6, "BALOGH", "SABAGH", "")	
			|| this.StringAt((m_current - 2), 7, "BAGHDAD", "")						
			|| this.StringAt((m_current - 3), 5, "WHIGH", "")
			|| this.StringAt((m_current - 5), 7, "SABBAGH", "AKHLAGH", "")))			
	{
		// silent - do nothing
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_Special_Cases = function()
{
	handled = false;

	// special case: 'hiccough' == 'hiccup'
	if(this.StringAt((m_current - 6), 8, "HICCOUGH", ""))
	{
		this.MetaphAdd("P");
		handled = true;
	}
	// special case: 'lough' alt spelling for scots 'loch'
	else if(this.StringAt(0, 5, "LOUGH", ""))
	{
		this.MetaphAdd("K");
		handled = true;
	}
	// hungarian
	else if(this.StringAt(0, 6, "BALOGH", ""))
	{
		this.MetaphAddExactApprox4("G", "", "K", "");
		handled = true;
	}
	// "maclaughlin"
	else if(this.StringAt((m_current - 3), 8, "LAUGHLIN", "COUGHLAN", "LOUGHLIN", ""))
	{
		this.MetaphAddWithAlt("K", "F");
		handled = true;
	}
	else if(this.StringAt((m_current - 3), 5, "GOUGH", "")
			|| this.StringAt((m_current - 7), 9, "COLCLOUGH", ""))
	{
		this.MetaphAddWithAlt("", "F");
		handled = true;
	}
	
	if(handled)
	{
		m_current += 2;
		return true;
	}

	return false;
}

/**
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GH_To_F = function()
{
	// the cases covered here would fall under
	// the GH_To_F rule below otherwise
	if(this.Encode_GH_Special_Cases())
	{
		return true;
	}
	else
	{
		//e.g., 'laugh', 'cough', 'rough', 'tough'
		if((m_current > 2) 
			&& (this.GetCharAt(m_current - 1) == 'U')
			&& this.IsVowel(m_current - 2)
			&& this.StringAt((m_current - 3), 1, "C", "G", "L", "R", "T", "N", "S", "")
			&& !this.StringAt((m_current - 4), 8, "BREUGHEL", "FLAUGHER", ""))
		{
			this.MetaphAdd("F");
			m_current += 2;
			return true;
		}
	}

	return false;
}

/**
 * Encode some contexts where "g" is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_G = function()
{
	// e.g. "phlegm", "apothegm", "voigt"
	if((((m_current + 1) == m_last) 
		&& (this.StringAt((m_current - 1), 3, "EGM", "IGM", "AGM", "")
			|| this.StringAt(m_current, 2, "GT", "")))
		|| (this.StringAt(0, 5, "HUGES", "") && (m_length == 5)))
	{
		m_current++;
		return true;
	}
	
	// vietnamese names special cases
	if((this.StringAt(0, 6, "NGUYEN", "NGHIEM", "NGUYET", "") && (m_length == 6))
		|| (this.StringAt(0, 4, "NGOC", "NGAN", "") && (m_length == 4)))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * ENcode "-GN-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GN = function()
{
	if(this.GetCharAt(m_current + 1) == 'N')
	{
		// 'align' 'sign', 'resign' but not 'resignation'
		// also 'impugn', 'impugnable', but not 'repugnant'
		if(((m_current > 1) 
			&& ((this.StringAt((m_current - 1), 1, "I", "U", "E", "") 
				|| this.StringAt((m_current - 3), 9, "LORGNETTE", "")
				|| this.StringAt((m_current - 2), 9, "LAGNIAPPE", "")
				|| this.StringAt((m_current - 2), 6, "COGNAC", "")
				|| this.StringAt((m_current - 3), 7, "CHAGNON", "")
				|| this.StringAt((m_current - 5), 9, "COMPAGNIE", "")
				|| this.StringAt((m_current - 4), 6, "BOLOGN", ""))
			// Exceptions: following are cases where 'G' is pronounced
			// in "assign" 'g' is silent, but not in "assignation"
			&& !(this.StringAt((m_current + 2), 5, "ATION", "")
				|| this.StringAt((m_current + 2), 4, "ATOR", "")
				|| this.StringAt((m_current + 2), 3, "ATE", "ITY", "")
			// exception to exceptions, not pronounced:
			|| (this.StringAt((m_current + 2), 2, "AN", "AC", "IA", "UM", "") 
				&& !(this.StringAt((m_current - 3), 8, "POIGNANT", "")
					|| this.StringAt((m_current - 2), 6, "COGNAC", "")))
			|| this.StringAt(0, 7, "SPIGNER", "STEGNER", "")
			|| (this.StringAt(0, 5, "SIGNE", "") && (m_length == 5))
			|| this.StringAt((m_current - 2), 5, "LIGNI", "LIGNO", "REGNA", "DIGNI", "WEGNE", 
											"TIGNE", "RIGNE", "REGNE", "TIGNO", "")
			|| this.StringAt((m_current - 2), 6, "SIGNAL", "SIGNIF", "SIGNAT", "")
			|| this.StringAt((m_current - 1), 5, "IGNIT", ""))
			&& !this.StringAt((m_current - 2), 6, "SIGNET", "LIGNEO", "") ))
			//not e.g. 'cagney', 'magna'
			|| (((m_current + 2) == m_last) 
					&& this.StringAt(m_current, 3, "GNE", "GNA", "")
					&& !this.StringAt((m_current - 2), 5, "SIGNA", "MAGNA", "SIGNE", "")))
		{
			this.MetaphAddExactApprox4("N", "GN", "N", "KN");
		}
		else
		{
			this.MetaphAddExactApprox("GN", "KN");
		}
		m_current += 2;
		return true;
	}
	return false;
}

/**
 * Encode "-GL-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GL = function()
{
	//'tagliaro', 'puglia' BUT add K in alternative 
	// since americans sometimes do this
	if(this.StringAt((m_current + 1), 3, "LIA", "LIO", "LIE", "") 
		&& this.IsVowel(m_current - 1))
	{
		this.MetaphAddExactApprox4("L", "GL", "L", "KL");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Initial_G_Soft = function()
{
	if(((this.StringAt((m_current + 1), 2, "EL", "EM", "EN", "EO", "ER", "ES", "IA", "IN", "IO", "IP", "IU", "YM", "YN", "YP", "YR", "EE", "")
			|| this.StringAt((m_current + 1), 3, "IRA", "IRO", ""))
		// except for smaller set of cases where => K, e.g. "gerber"
		&& !(this.StringAt((m_current + 1), 3, "ELD", "ELT", "ERT", "INZ", "ERH", "ITE", "ERD", "ERL", "ERN", 
										  "INT", "EES", "EEK", "ELB", "EER", "")
				|| this.StringAt((m_current + 1), 4, "ERSH", "ERST", "INSB", "INGR", "EROW", "ERKE", "EREN", "")
				|| this.StringAt((m_current + 1), 5, "ELLER", "ERDIE", "ERBER", "ESUND", "ESNER", "INGKO", "INKGO", 
												"IPPER", "ESELL", "IPSON", "EEZER", "ERSON", "ELMAN", "")
				|| this.StringAt((m_current + 1), 6, "ESTALT", "ESTAPO", "INGHAM", "ERRITY", "ERRISH", "ESSNER", "ENNADI", "ENNADY", "ENGLER", "")
				|| this.StringAt((m_current + 1), 7, "YNAECOL", "YNECOLO", "ENTHNER", "ERAGHTY", "")
				|| this.StringAt((m_current + 1), 8, "INGERICH", "EOGHEGAN", "")))
		||(this.IsVowel(m_current + 1)
			&& (this.StringAt((m_current + 1), 3, "EE ", "EEW", "")
					|| (this.StringAt((m_current + 1), 3, "IGI", "IRA", "IBE", "AOL", "IDE", "IGL", "") 
													&& !this.StringAt((m_current + 1), 5, "IDEON", "") )
				|| this.StringAt((m_current + 1), 4, "ILES", "INGI", "ISEL", "")
				|| (this.StringAt((m_current + 1), 5, "INGER", "") && !this.StringAt((m_current + 1), 8, "INGERICH", "")) 
				|| this.StringAt((m_current + 1), 5, "IBBER", "IBBET", "IBLET", "IBRAN", "IGOLO", "IRARD", "IGANT", "")
				|| this.StringAt((m_current + 1), 6, "IRAFFE", "EEWHIZ","")
				|| this.StringAt((m_current + 1), 7, "ILLETTE", "IBRALTA", ""))))
	{
		return true;
	}

	return false;
}

/**
 * Encode cases where 'G' is at start of word followed
 * by a "front" vowel e.g. 'E', 'I', 'Y'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_G_Front_Vowel = function()
{
	// 'g' followed by vowel at beginning
	if((m_current == 0) && this.Front_Vowel(m_current + 1))
	{
		// special case "gila" as in "gila monster"
		if(this.StringAt((m_current + 1), 3, "ILA", "")
			&& (m_length == 4))
		{
			this.MetaphAdd("H");
		}
		else if(this.Initial_G_Soft())
		{
			this.MetaphAddExactApprox4("J", "G", "J", "K");
		}
		else
		{
			// only code alternate 'J' if front vowel
			if((m_inWord.charAt(m_current + 1) == 'E') || (m_inWord.charAt(m_current + 1) == 'I'))
			{
				this.MetaphAddExactApprox4("G", "J", "K", "J");
			}
			else
			{
				this.MetaphAddExactApprox("G", "K");
			}
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-NGER-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_NGER = function()
{
	if((m_current > 1)
		&& this.StringAt((m_current - 1), 4, "NGER", ""))
	{
		// default 'G' => J  such as 'ranger', 'stranger', 'manger', 'messenger', 'orangery', 'granger'
		// 'boulanger', 'challenger', 'danger', 'changer', 'harbinger', 'lounger', 'ginger', 'passenger'
		// except for these the following
		if(!(this.RootOrInflections(m_inWord, "ANGER")
			|| this.RootOrInflections(m_inWord, "LINGER")
			|| this.RootOrInflections(m_inWord, "MALINGER")
			|| this.RootOrInflections(m_inWord, "FINGER")
			|| (this.StringAt((m_current - 3), 4, "HUNG", "FING", "BUNG", "WING", "RING", "DING", "ZENG", 
											 "ZING", "JUNG", "LONG", "PING", "CONG", "MONG", "BANG", 
											 "GANG", "HANG", "LANG", "SANG", "SING", "WANG", "ZANG", "")
				// exceptions to above where 'G' => J	
				&& !(this.StringAt((m_current - 6), 7, "BOULANG", "SLESING", "KISSING", "DERRING", "")
						|| this.StringAt((m_current - 8), 9, "SCHLESING", "")
						|| this.StringAt((m_current - 5), 6, "SALING", "BELANG", "")
						|| this.StringAt((m_current - 6), 7, "BARRING", "")
						|| this.StringAt((m_current - 6), 9, "PHALANGER", "")
						|| this.StringAt((m_current - 4), 5, "CHANG", "")))
			|| this.StringAt((m_current - 4), 5, "STING", "YOUNG", "")
			|| this.StringAt((m_current - 5), 6, "STRONG", "")
			|| this.StringAt(0, 3, "UNG", "ENG", "ING", "")
			|| this.StringAt(m_current, 6, "GERICH", "")
			|| this.StringAt(0, 6, "SENGER", "")
			|| this.StringAt((m_current - 3), 6, "WENGER", "MUNGER", "SONGER", "KINGER", "")
			|| this.StringAt((m_current - 4), 7, "FLINGER", "SLINGER", "STANGER", "STENGER", "KLINGER", "CLINGER", "")
			|| this.StringAt((m_current - 5), 8, "SPRINGER", "SPRENGER", "")
			|| this.StringAt((m_current - 3), 7, "LINGERF", "")
			|| this.StringAt((m_current - 2), 7, "ANGERLY", "ANGERBO", "INGERSO", "") ))
		{
			this.MetaphAddExactApprox4("J", "G", "J", "K");
		}
		else
		{
			this.MetaphAddExactApprox4("G", "J", "K", "J");
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-GER-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GER = function()
{
	if((m_current > 0)
		&& this.StringAt((m_current + 1), 2, "ER", ""))
	{
		// Exceptions to 'GE' where 'G' => K
		// e.g. "JAGER", "TIGER", "LIGER", "LAGER", "LUGER", "AUGER", "EAGER", "HAGER", "SAGER"
		if((((m_current == 2) && this.IsVowel(m_current - 1) && !this.IsVowel(m_current - 2) 
				&& !(this.StringAt((m_current - 2), 5, "PAGER", "WAGER", "NIGER", "ROGER", "LEGER", "CAGER", ""))
			|| this.StringAt((m_current - 2), 5, "AUGER", "EAGER", "INGER", "YAGER", "")) 
			|| this.StringAt((m_current - 3), 6, "SEEGER", "JAEGER", "GEIGER", "KRUGER", "SAUGER", "BURGER", 
											"MEAGER", "MARGER", "RIEGER", "YAEGER", "STEGER", "PRAGER", "SWIGER", 
											"YERGER", "TORGER", "FERGER", "HILGER", "ZEIGER", "YARGER", 
											"COWGER", "CREGER", "KROGER", "KREGER", "GRAGER", "STIGER", "BERGER", "")
			// 'berger' but not 'bergerac'
			|| (this.StringAt((m_current - 3), 6, "BERGER", "") && ((m_current + 2) == m_last))
			|| this.StringAt((m_current - 4), 7, "KREIGER", "KRUEGER", "METZGER", "KRIEGER", "KROEGER", "STEIGER", 
											"DRAEGER", "BUERGER", "BOERGER", "FIBIGER", "")
			// e.g. 'harshbarger', 'winebarger'
			|| (this.StringAt((m_current - 3), 6, "BARGER", "") && (m_current > 4))
			// e.g. 'weisgerber'
			|| (this.StringAt(m_current, 6, "GERBER", "") && (m_current > 0))
			|| this.StringAt((m_current - 5), 8, "SCHWAGER",	"LYBARGER",	"SPRENGER", "GALLAGER", "WILLIGER", "")
			|| this.StringAt(0, 6, "HARGER", "")
			|| (this.StringAt(0, 4, "AGER", "EGER", "") && (m_length == 4))
			|| this.StringAt((m_current - 1), 6, "YGERNE", "") 
			|| this.StringAt((m_current - 6), 9, "SCHWEIGER", "")) 
			&& !(this.StringAt((m_current - 5), 10, "BELLIGEREN", "")
					|| this.StringAt(0, 7, "MARGERY", "")
					|| this.StringAt((m_current - 3), 8, "BERGERAC", "")))
		{				
			if(this.SlavoGermanic())
			{
				this.MetaphAddExactApprox("G", "K");
			}
			else
			{
				this.MetaphAddExactApprox4("G", "J", "K", "J");											
			}
		}
		else
		{
			this.MetaphAddExactApprox4("J", "G", "J", "K");
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * ENcode "-GEL-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GEL = function()
{
	// more likely to be "-GEL-" => JL
	if(this.StringAt((m_current + 1), 2, "EL", "")
		&& (m_current > 0))
	{
		// except for
		// "BAGEL", "HEGEL", "HUGEL", "KUGEL", "NAGEL", "VOGEL", "FOGEL", "PAGEL"
		if(((m_length == 5) 
				&& this.IsVowel(m_current - 1) 
				&& !this.IsVowel(m_current - 2)
				&& !this.StringAt((m_current - 2), 5, "NIGEL", "RIGEL", ""))
			// or the following as combining forms
			|| this.StringAt((m_current - 2), 5, "ENGEL", "HEGEL", "NAGEL", "VOGEL", "")
			|| this.StringAt((m_current - 3), 6, "MANGEL", "WEIGEL", "FLUGEL", "RANGEL", "HAUGEN", "RIEGEL", "VOEGEL", "")
			|| this.StringAt((m_current - 4), 7, "SPEIGEL", "STEIGEL", "WRANGEL", "SPIEGEL", "")
			|| this.StringAt((m_current - 4), 8, "DANEGELD", ""))
		{
			if(this.SlavoGermanic())
			{
				this.MetaphAddExactApprox("G", "K");
			}
			else
			{
				this.MetaphAddExactApprox4("G", "J", "K", "J");											
			}
		}
		else
		{
			this.MetaphAddExactApprox4("J", "G", "J", "K");
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-G-" followed by a vowel when non-initial leter.
 * Default for this is a 'J' sound, so check exceptions where
 * it is pronounced 'G'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Non_Initial_G_Front_Vowel = function()
{
	// -gy-, gi-, ge-
	if(this.StringAt((m_current + 1), 1, "E", "I", "Y", ""))
	{
		// '-ge' at end
		// almost always 'j 'sound
		if(this.StringAt(m_current, 2, "GE", "") && (m_current == (m_last - 1)))
		{
			if(this.Hard_GE_At_End())
			{
				if(this.SlavoGermanic())
				{
					this.MetaphAddExactApprox("G", "K");
				}
				else
				{
					this.MetaphAddExactApprox4("G", "J", "K", "J");											
				}
			}
			else
			{
				this.MetaphAdd("J");
			}
		}
		else
		{
			if(this.Internal_Hard_G())
			{
				// don't encode KG or KK if e.g. "mcgill"
				if(!((m_current == 2) && this.StringAt(0, 2, "MC", "")) 
					   || ((m_current == 3) && this.StringAt(0, 3, "MAC", "")))
				{
					if(this.SlavoGermanic())
					{
						this.MetaphAddExactApprox("G", "K");
					}
					else
					{
						this.MetaphAddExactApprox4("G", "J", "K", "J");											
					}
				}
			}
			else
			{
				this.MetaphAddExactApprox4("J", "G", "J", "K");
			}
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/*
 * Detect german names and other words that have
 * a 'hard' 'g' in the context of "-ge" at end
 * 
 * @return true if encoding handled in this routine, false if not
 */
Metaphone3.prototype.Hard_GE_At_End = function()
{
	if(this.StringAt(0, 6, "RENEGE", "STONGE", "STANGE", "PRANGE", "KRESGE", "") 
		|| this.StringAt(0, 5, "BYRGE", "BIRGE", "BERGE", "HAUGE", "")
		|| this.StringAt(0, 4, "HAGE", "")					
		|| this.StringAt(0, 5, "LANGE", "SYNGE", "BENGE", "RUNGE", "HELGE", "")
		|| this.StringAt(0, 4, "INGE", "LAGE", ""))
	{
		return true;
	}
		
	return false;
}

/**
 * Exceptions to default encoding to 'J':
 * encode "-G-" to 'G' in "-g<frontvowel>-" words
 * where we are not at "-GE" at the end of the word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Internal_Hard_G = function()
{
	// if not "-GE" at end
	if(!(((m_current + 1) == m_last) && (this.GetCharAt(m_current + 1) == 'E') ) 
			&& (this.Internal_Hard_NG()
				|| this.Internal_Hard_GEN_GIN_GET_GIT()
				|| this.Internal_Hard_G_Open_Syllable()
				|| this.Internal_Hard_G_Other()))
	{
		return true;
	}
		
	return false;
}

/**
 * Detect words where "-ge-" or "-gi-" get a 'hard' 'g'
 * even though this is usually a 'soft' 'g' context
 *  
 * @return true if 'hard' 'g' detected
 * 
 */
Metaphone3.prototype.Internal_Hard_G_Other = function()
{
	if((this.StringAt(m_current, 4, "GETH", "GEAR", "GEIS", "GIRL", "GIVI", "GIVE", "GIFT", 
							   "GIRD", "GIRT", "GILV", "GILD", "GELD", "")
				&& !this.StringAt((m_current - 3), 6, "GINGIV", "") )
			// "gish" but not "largish"
			|| (this.StringAt((m_current + 1), 3, "ISH", "") && (m_current > 0) && !this.StringAt(0, 4, "LARG", ""))
			|| (this.StringAt((m_current - 2), 5, "MAGED", "MEGID", "") && !((m_current + 2) == m_last))
			|| this.StringAt(m_current, 3, "GEZ", "") 
			|| this.StringAt(0, 4, "WEGE", "HAGE", "") 
			|| (this.StringAt((m_current - 2), 6, "ONGEST", "UNGEST", "") 
				&& ((m_current + 3) == m_last)
				&& !this.StringAt((m_current - 3), 7, "CONGEST", "")) 
			|| this.StringAt(0, 5, "VOEGE", "BERGE", "HELGE", "")
			|| (this.StringAt(0, 4, "ENGE", "BOGY", "") && (m_length == 4))
			|| this.StringAt(m_current, 6, "GIBBON", "") 
			|| this.StringAt(0, 10, "CORREGIDOR", "") 
			|| this.StringAt(0, 8, "INGEBORG", "") 
			|| (this.StringAt(m_current, 4, "GILL", "") 
					&& (((m_current + 3) == m_last) || ((m_current + 4) == m_last))
					&& !this.StringAt(0, 8, "STURGILL", "")))
	{
		return true;
	}

	return false;
}

/**
 * Detect words where "-gy-", "-gie-", "-gee-", 
 * or "-gio-" get a 'hard' 'g' even though this is 
 * usually a 'soft' 'g' context
 *  
 * @return true if 'hard' 'g' detected
 * 
 */
Metaphone3.prototype.Internal_Hard_G_Open_Syllable = function()
{
	if(this.StringAt((m_current + 1), 3, "EYE", "")
		|| this.StringAt((m_current - 2), 4, "FOGY", "POGY", "YOGI", "") 
		|| this.StringAt((m_current - 2), 5, "MAGEE", "MCGEE", "HAGIO", "") 
		|| this.StringAt((m_current - 1), 4, "RGEY", "OGEY", "") 
		|| this.StringAt((m_current - 3), 5, "HOAGY", "STOGY", "PORGY", "") 
		|| this.StringAt((m_current - 5), 8, "CARNEGIE", "") 
		|| (this.StringAt((m_current - 1), 4, "OGEY", "OGIE", "") && ((m_current + 2) == m_last)))
	{
		return true;
	}

	return false;
}

/**
 * Detect a number of contexts, mostly german names, that
 * take a 'hard' 'g'.
 * 
 * @return true if 'hard' 'g' detected, false if not
 *  
 */
Metaphone3.prototype.Internal_Hard_GEN_GIN_GET_GIT = function()
{
	if((this.StringAt((m_current - 3), 6, "FORGET", "TARGET", "MARGIT", "MARGET", "TURGEN", 
									 "BERGEN", "MORGEN", "JORGEN", "HAUGEN", "JERGEN", 
									 "JURGEN", "LINGEN", "BORGEN", "LANGEN", "KLAGEN", "STIGER", "BERGER", "") 
				&& !this.StringAt(m_current, 7, "GENETIC", "GENESIS", "")
				&& !this.StringAt((m_current - 4), 8, "PLANGENT", ""))
		|| (this.StringAt((m_current - 3), 6, "BERGIN", "FEAGIN", "DURGIN", "") && ((m_current + 2) == m_last))
		|| (this.StringAt((m_current - 2), 5, "ENGEN", "") && !this.StringAt((m_current + 3), 3, "DER", "ETI", "ESI", ""))
		|| this.StringAt((m_current - 4), 7, "JUERGEN", "")
		|| this.StringAt(0, 5, "NAGIN", "MAGIN", "HAGIN", "")
		|| (this.StringAt(0, 5, "ENGIN", "DEGEN", "LAGEN", "MAGEN", "NAGIN", "") && (m_length == 5))
		|| (this.StringAt((m_current - 2), 5, "BEGET", "BEGIN", "HAGEN", "FAGIN", 
									 "BOGEN", "WIGIN", "NTGEN", "EIGEN", 
									 "WEGEN", "WAGEN", "")
			&& !this.StringAt((m_current - 5), 8, "OSPHAGEN", "")))
	{
		return true;
	}

	return false;
}
/**
 * Detect a number of contexts of '-ng-' that will
 * take a 'hard' 'g' despite being followed by a
 * front vowel.
 * 
 * @return true if 'hard' 'g' detected, false if not
 * 
 */
Metaphone3.prototype.Internal_Hard_NG = function()
{
	if((this.StringAt((m_current - 3), 4, "DANG", "FANG", "SING", "") 
		// exception to exception
				&& !this.StringAt((m_current - 5), 8, "DISINGEN", "") )
		|| this.StringAt(0, 5, "INGEB", "ENGEB", "")
		|| (this.StringAt((m_current - 3), 4, "RING", "WING", "HANG", "LONG", "")
				&& !(this.StringAt((m_current - 4), 5, "CRING", "FRING", "ORANG", "TWING", "CHANG", "PHANG", "")
					|| this.StringAt((m_current - 5), 6, "SYRING", "") 
					|| this.StringAt((m_current - 3), 7, "RINGENC", "RINGENT", "LONGITU", "LONGEVI", "") 
					// e.g. 'longino', 'mastrangelo'
					|| (this.StringAt(m_current, 4, "GELO", "GINO", "") && ((m_current + 3) == m_last))))
		|| (this.StringAt((m_current - 1), 3, "NGY", "")
		// exceptions to exception
				&& !(this.StringAt((m_current - 3), 5, "RANGY", "MANGY", "MINGY", "")
					|| this.StringAt((m_current - 4), 6, "SPONGY", "STINGY", ""))))
	{
		return true;
	}

	return false;
}

/**
 * Encode special case where "-GA-" => J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_GA_To_J = function()
{
	// 'margary', 'margarine'
	if((this.StringAt((m_current - 3), 7, "MARGARY", "MARGARI", "")
		// but not in spanish forms such as "margatita"
		&& !this.StringAt((m_current - 3), 8, "MARGARIT", ""))
		|| this.StringAt(0, 4, "GAOL", "")
		|| this.StringAt((m_current - 2), 5, "ALGAE", ""))
	{
		this.MetaphAddExactApprox4("J", "G", "J", "K");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode 'H'
 * 
 * 
 */
Metaphone3.prototype.Encode_H = function()
{
	if(this.Encode_Initial_Silent_H()
		|| this.Encode_Initial_HS()
		|| this.Encode_Initial_HU_HW()
		|| this.Encode_Non_Initial_Silent_H())
	{
		return;
	}

	//only keep if first & before vowel or btw. 2 vowels
	if(!this.Encode_H_Pronounced())
	{
		//also takes care of 'HH'
		m_current++;
	}
}

/**
 * Encode cases where initial 'H' is not pronounced (in American)
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_Silent_H = function()
{
	//'hour', 'herb', 'heir', 'honor'
	if(this.StringAt((m_current + 1), 3, "OUR", "ERB", "EIR", "")
		|| this.StringAt((m_current + 1), 4, "ONOR", "")
		|| this.StringAt((m_current + 1), 5, "ONOUR", "ONEST", ""))
	{
		// british pronounce H in this word
		// americans give it 'H' for the name,
		// no 'H' for the plant
		if((m_current == 0) && this.StringAt(m_current, 4, "HERB", ""))
		{
			if(m_encodeVowels)
			{
				this.MetaphAddWithAlt("HA", "A");
			}
			else
			{
				this.MetaphAddWithAlt("H", "A");
			}
		}
		else if((m_current == 0) || m_encodeVowels)
		{
			this.MetaphAdd("A");
		}

		m_current++;
		// don't encode vowels twice
		m_current = this.SkipVowels(m_current);
		return true;
	}

	return false;
}

/**
 * Encode "HS-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_HS = function()
{
	// old chinese pinyin transliteration
	// e.g., 'HSIAO'
	if ((m_current == 0) && this.StringAt(0, 2, "HS", ""))
	{
		this.MetaphAdd("X");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode cases where "HU-" is pronounced as part of a vowel dipthong
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_HU_HW = function()
{
	// spanish spellings and chinese pinyin transliteration
	if (this.StringAt(0, 3, "HUA", "HUE", "HWA", ""))
	{
		if(!this.StringAt(m_current, 4, "HUEY", ""))
		{
			this.MetaphAdd("A");

			if(!m_encodeVowels)
			{
				m_current += 3;
			}
			else
			{
				m_current++;
				// don't encode vowels twice
				while(this.IsVowel(m_current) || (this.GetCharAt(m_current) == 'W'))
				{
					m_current++;
				}
			}
			return true;
		}
	}

	return false;
}

/**
 * Encode cases where 'H' is silent between vowels
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Non_Initial_Silent_H = function()
{
	//exceptions - 'h' not pronounced
	// "PROHIB" BUT NOT "PROHIBIT"
	if(this.StringAt((m_current - 2), 5, "NIHIL", "VEHEM", "LOHEN", "NEHEM", 
									"MAHON", "MAHAN", "COHEN", "GAHAN", "")
		|| this.StringAt((m_current - 3), 6, "GRAHAM", "PROHIB", "FRAHER", 
										"TOOHEY", "TOUHEY", "")
		|| this.StringAt((m_current - 3), 5, "TOUHY", "")
		|| this.StringAt(0, 9, "CHIHUAHUA", ""))
	{
		if(!m_encodeVowels)
		{
			m_current += 2;
		}
		else
		{
			m_current++;
			// don't encode vowels twice
			m_current = this.SkipVowels(m_current);
		}
		return true;
	}

	return false;
}

/**
 * Encode cases where 'H' is pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_H_Pronounced = function()
{
	if((((m_current == 0) 
			|| this.IsVowel(m_current - 1) 
			|| this.StringAt((m_current - 1), 1, "'", "") // e.g. "o'hara"				
			|| ((m_current > 0) 
				&& (this.GetCharAt(m_current - 1) == 'W'))) 
		&& this.IsVowel(m_current + 1))
		// e.g. 'alWahhab'
		|| ((this.GetCharAt(m_current + 1) == 'H') && this.IsVowel(m_current + 2))) 
	{
		this.MetaphAdd("H");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode 'J'
 * 
 */
Metaphone3.prototype.Encode_J = function()
{
	if(this.Encode_Spanish_J()
		|| this.Encode_Spanish_OJ_UJ())
	{
		return;
	}

	this.Encode_Other_J();
}

/**
 * Encode cases where initial or medial "j" is in a spanish word or name
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Spanish_J = function()
{
	//obvious spanish, e.g. "jose", "san jacinto"
	if((this.StringAt((m_current + 1), 3, "UAN", "ACI", "ALI", "EFE", "ICA", "IME", "OAQ", "UAR", "")
			&& !this.StringAt(m_current, 8, "JIMERSON", "JIMERSEN", ""))
		|| (this.StringAt((m_current + 1), 3, "OSE", "") && ((m_current + 3) == m_last))
		|| this.StringAt((m_current + 1), 4, "EREZ", "UNTA", "AIME", "AVIE", "AVIA", "")
		|| this.StringAt((m_current + 1), 6, "IMINEZ", "ARAMIL", "")
		|| (((m_current + 2) == m_last) && this.StringAt((m_current - 2), 5, "MEJIA", ""))
		|| this.StringAt((m_current - 2), 5, "TEJED", "TEJAD", "LUJAN", "FAJAR", "BEJAR", "BOJOR", "CAJIG", 
										"DEJAS", "DUJAR", "DUJAN", "MIJAR", "MEJOR", "NAJAR", 
										"NOJOS", "RAJED", "RIJAL", "REJON", "TEJAN", "UIJAN", "")
		|| this.StringAt((m_current - 3), 8, "ALEJANDR", "GUAJARDO", "TRUJILLO", "")
		|| (this.StringAt((m_current - 2), 5, "RAJAS", "") && (m_current > 2))
		|| (this.StringAt((m_current - 2), 5, "MEJIA", "") && !this.StringAt((m_current - 2), 6, "MEJIAN", ""))
		|| this.StringAt((m_current - 1), 5, "OJEDA", "")
		|| this.StringAt((m_current - 3), 5, "LEIJA", "MINJA", "")
		|| this.StringAt((m_current - 3), 6, "VIAJES", "GRAJAL", "")
		|| this.StringAt(m_current, 8, "JAUREGUI", "")
		|| this.StringAt((m_current - 4), 8, "HINOJOSA", "")
		|| this.StringAt(0, 4, "SAN ", "") 
		|| (((m_current + 1) == m_last)
		&& (this.GetCharAt(m_current + 1) == 'O')
		// exceptions
		&& !(this.StringAt(0, 4, "TOJO", "") 
				|| this.StringAt(0, 5, "BANJO", "") 
				|| this.StringAt(0, 6, "MARYJO", ""))))
	{
		// americans pronounce "juan" as 'wan'
		// and "marijuana" and "tijuana" also
		// do not get the 'H' as in spanish, so
		// just treat it like a vowel in these cases
		if(!(this.StringAt(m_current, 4, "JUAN", "") || this.StringAt(m_current, 4, "JOAQ", "")))
		{
			this.MetaphAdd("H");
		}
		else
		{
			if(m_current == 0)
			{
				this.MetaphAdd("A");
			}
		}
		this.AdvanceCounter(2, 1);
		return true;
	}
	
	// Jorge gets 2nd HARHA. also JULIO, JESUS
	if(this.StringAt((m_current + 1), 4, "ORGE", "ULIO", "ESUS", "")
		&& !this.StringAt(0, 6, "JORGEN", ""))
	{
		// get both consonants for "jorge"
		if(this.StringAt((m_current + 1), 4, "ORGE", ""))
		{
			if(m_encodeVowels)
			{
				this.MetaphAddWithAlt("JARJ", "HARHA");				
			}
			else
			{
				this.MetaphAddWithAlt("JRJ", "HRH");
			}				
			this.AdvanceCounter(5, 5);
			return true;				
		}
		
		this.MetaphAddWithAlt("J", "H");			
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode cases where 'J' is clearly in a german word or name
 * that americans pronounce in the german fashion
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_German_J = function()
{
	if(this.StringAt((m_current + 1), 2, "AH", "")
		|| (this.StringAt((m_current + 1), 5, "OHANN", "") && ((m_current + 5) == m_last))
		|| (this.StringAt((m_current + 1), 3, "UNG", "") && !this.StringAt((m_current + 1), 4, "UNGL", ""))
		|| this.StringAt((m_current + 1), 3, "UGO", ""))
	{
		this.MetaphAdd("A");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-JOJ-" and "-JUJ-" as spanish words
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Spanish_OJ_UJ = function()
{
	if(this.StringAt((m_current + 1), 5, "OJOBA", "UJUY ", ""))
	{
		if(m_encodeVowels)
		{
			this.MetaphAdd("HAH");
		}
		else
		{
			this.MetaphAdd("HH");
		}

		this.AdvanceCounter(4, 3);
		return true;
	}

	return false;
}

/**
 * Encode 'J' => J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_J_To_J = function()
{
	if(this.IsVowel(m_current + 1))
	{
		if((m_current == 0) 
			&& this.Names_Beginning_With_J_That_Get_Alt_Y())
		{
			// 'Y' is a vowel so encode
			// is as 'A'
			if(m_encodeVowels)
			{
				this.MetaphAddWithAlt("JA", "A");
			}
			else
			{
				this.MetaphAddWithAlt("J", "A");
			}
		}
		else
		{
			if(m_encodeVowels)
			{
				this.MetaphAdd("JA");
			}
			else
			{
				this.MetaphAdd("J");
			}
		}

		m_current++;
		m_current = this.SkipVowels(m_current);
		return false;
	}
	else
	{
		this.MetaphAdd("J");
		m_current++;
		return true;
	}

//		return false;
}

/**
 * Encode 'J' toward end in spanish words
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Spanish_J_2 = function()
{
	// spanish forms e.g. "brujo", "badajoz"
	if((((m_current - 2) == 0) 
		&& this.StringAt((m_current - 2), 4, "BOJA", "BAJA", "BEJA", "BOJO", "MOJA", "MOJI", "MEJI", ""))
		|| (((m_current - 3) == 0)
		&& this.StringAt((m_current - 3), 5, "FRIJO", "BRUJO", "BRUJA", "GRAJE", "GRIJA", "LEIJA", "QUIJA", ""))
		|| (((m_current + 3) == m_last) 
		&& this.StringAt((m_current - 1), 5, "AJARA", ""))
		|| (((m_current + 2) == m_last) 
		&& this.StringAt((m_current - 1), 4, "AJOS", "EJOS", "OJAS", "OJOS", "UJON", "AJOZ", "AJAL", "UJAR", "EJON", "EJAN", ""))
		|| (((m_current + 1) == m_last) 
		&& (this.StringAt((m_current - 1), 3, "OJA", "EJA", "") && !this.StringAt(0, 4, "DEJA", ""))))
	{
		this.MetaphAdd("H");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode 'J' as vowel in some exception cases
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_J_As_Vowel = function()
{
	if(this.StringAt(m_current, 5, "JEWSK", ""))
	{
		this.MetaphAddWithAlt("J", "");
		return true;
	}
	
	// e.g. "stijl", "sejm" - dutch, scandanavian, and eastern european spellings
	if((this.StringAt((m_current + 1), 1, "L", "T", "K", "S", "N", "M", "")
			// except words from hindi and arabic
			&& !this.StringAt((m_current + 2), 1, "A", ""))
		|| this.StringAt(0, 9, "HALLELUJA", "LJUBLJANA", "")
		|| this.StringAt(0, 4, "LJUB", "BJOR", "")
		|| this.StringAt(0, 5, "HAJEK", "")
		|| this.StringAt(0, 3, "WOJ", "")
		// e.g. 'fjord'
		|| this.StringAt(0, 2, "FJ", "")
		// e.g. 'rekjavik', 'blagojevic'
		|| this.StringAt(m_current, 5, "JAVIK", "JEVIC", "")
		|| (((m_current + 1) == m_last) && this.StringAt(0, 5, "SONJA", "TANJA", "TONJA", "")))

	{
		return true;
	}
	return false;
}

/**
 * Call routines to encode 'J', in proper order
 * 
 */
Metaphone3.prototype.Encode_Other_J = function()
{
	if(m_current == 0)
	{
		if(this.Encode_German_J())
		{
			return;
		}
		else
		{
			if(this.Encode_J_To_J())
			{
				return;
			}
		}
	}
	else
	{
		if(this.Encode_Spanish_J_2())
		{
			return;
		}
		else if(!this.Encode_J_As_Vowel())
		{
			this.MetaphAdd("J");
		}
		
		//it could happen! e.g. "hajj"
		// eat redundant 'J'
		if(this.GetCharAt(m_current + 1) == 'J')
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}
	}
}

/**
 * Encode 'K'
 * 
 * 
 */
Metaphone3.prototype.Encode_K = function()
{
	if(!this.Encode_Silent_K())
	{
		if((this.GetCharAt(m_current + 1) == 'H')
				&& ((m_current + 1) != m_last))
		{
			this.MetaphAddWithAlt("K", "H");
		}
		else
		{
			this.MetaphAdd("K");
		}

		// eat redundant 'K's and 'Q's
		if((this.GetCharAt(m_current + 1) == 'K')
			|| (this.GetCharAt(m_current + 1) == 'Q'))
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}
	}
}

/**
 * Encode cases where 'K' is not pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_K = function()
{
    //skip this except for special cases
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "KN", ""))
    {
        if(!(this.StringAt((m_current + 2), 5, "ESSET", "IEVEL", "") || this.StringAt((m_current + 2), 3, "ISH", "") ))
        {
            m_current += 1;
			return true;
        }
    }

	// e.g. "know", "knit", "knob"	
	if((this.StringAt((m_current + 1), 3, "NOW", "NIT", "NOT", "NOB", "")
			// exception, "slipknot" => SLPNT but "banknote" => PNKNT
			&& !this.StringAt(0, 8, "BANKNOTE", ""))
		|| this.StringAt((m_current + 1), 4, "NOCK", "NUCK", "NIFE", "NACK", "")
		|| this.StringAt((m_current + 1), 5, "NIGHT", ""))
	{
		// N already encoded before
		// e.g. "penknife"
		if ((m_current > 0) && this.GetCharAt(m_current - 1) == 'N')
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}

		return true;
	}
	
	return false;
}

/**
 * Encode 'L'
 *
 * Includes special vowel transposition 
 * encoding, where 'LE' => AL
 * 
 */
Metaphone3.prototype.Encode_L = function()
{
	// logic below needs to know this
	// after 'm_current' variable changed 
	save_current = m_current;

	this.Interpolate_Vowel_When_Cons_L_At_End();
	
	if(this.Encode_LELY_To_L()
		|| this.Encode_COLONEL()
		|| this.Encode_French_AULT()
		|| this.Encode_French_EUIL()
		|| this.Encode_French_OULX()
		|| this.Encode_Silent_L_In_LM()
		|| this.Encode_Silent_L_In_LK_LV()
		|| this.Encode_Silent_L_In_OULD())
	{
		return;
	}

	if(this.Encode_LL_As_Vowel_Cases())
	{
		return;
	}

	this.Encode_LE_Cases(save_current);
}

/**
 * Cases where an L follows D, G, or T at the
 * end have a schwa pronounced before the L
 * 
 */
Metaphone3.prototype.Interpolate_Vowel_When_Cons_L_At_End = function()
{
	if(m_encodeVowels == true)
	{
		// e.g. "ertl", "vogl"
		if((m_current == m_last) 
			&& this.StringAt((m_current - 1), 1, "D", "G", "T", ""))
		{
			this.MetaphAdd("A");
		}
	}
}

/**
 * Catch cases where 'L' spelled twice but pronounced
 * once, e.g., 'DOCILELY' => TSL
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_LELY_To_L = function()
{
	// e.g. "agilely", "docilely"
	if(this.StringAt((m_current - 1), 5, "ILELY", "")
		&& ((m_current + 3) == m_last))
	{
		this.MetaphAdd("L");
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode special case "colonel" => KRNL. Can somebody tell
 * me how this pronounciation came to be?
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_COLONEL = function()
{
	if(this.StringAt((m_current - 2), 7, "COLONEL", ""))
	{
		this.MetaphAdd("R");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-AULT-", found in a french names
 * 
 * @return true if encoding handled in this routine, false if not
 *  
 */
Metaphone3.prototype.Encode_French_AULT = function()
{
	// e.g. "renault" and "foucault", well known to americans, but not "fault"
	if((m_current > 3)
		&& (this.StringAt((m_current - 3), 5, "RAULT", "NAULT", "BAULT", "SAULT", "GAULT", "CAULT", "")
			|| this.StringAt((m_current - 4), 6, "REAULT", "RIAULT", "NEAULT", "BEAULT", ""))
		&& !(this.RootOrInflections(m_inWord, "ASSAULT") 
			|| this.StringAt((m_current - 8), 10, "SOMERSAULT","")
			|| this.StringAt((m_current - 9), 11, "SUMMERSAULT", "")))
	{
		this.MetaphAddWithAlt("", "LT"); // sometimes pronounced e.g. 'Clair Chennault'
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-EUIL-", always found in a french word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_French_EUIL = function()
{
	// e.g. "auteuil"
	if(this.StringAt((m_current - 3), 4, "EUIL", "") && (m_current == m_last))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-OULX", always found in a french word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_French_OULX = function()
{
	// e.g. "proulx"
	if(this.StringAt((m_current - 2), 4, "OULX", "") && ((m_current + 1) == m_last))
	{
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encodes contexts where 'L' is not pronounced in "-LM-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_L_In_LM = function()
{
	if(this.StringAt(m_current, 2, "LM", "LN", ""))
	{
		// e.g. "lincoln", "holmes", "psalm", "salmon"
		if((this.StringAt((m_current - 2), 4, "COLN", "CALM", "BALM", "MALM", "PALM", "")
			|| (this.StringAt((m_current - 1), 3, "OLM", "") && ((m_current + 1) == m_last))
			|| this.StringAt((m_current - 3), 5, "PSALM", "QUALM", "")
			|| this.StringAt((m_current - 2), 6,  "SALMON", "HOLMES", "")
			|| this.StringAt((m_current - 1), 6,  "ALMOND", "")
			|| ((m_current == 1) && this.StringAt((m_current - 1), 4, "ALMS", "") ))
			&& (!this.StringAt((m_current + 2), 1, "A", "") 
				&& !this.StringAt((m_current - 2), 5, "BALMO", "")
				&& !this.StringAt((m_current - 2), 6, "PALMER", "PALMOR", "BALMER", "")
				&& !this.StringAt((m_current - 3), 5, "THALM", "")))
		{
			m_current++;
			return true;
		}
		else
		{
			this.MetaphAdd("L");
			m_current++;
			return true;
		}
	}

	return false;
}

/**
 * Encodes contexts where '-L-' is silent in 'LK', 'LV'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_L_In_LK_LV = function()
{
	if((this.StringAt((m_current - 2), 4, "WALK", "YOLK", "FOLK", "HALF", "TALK", "CALF", "BALK", "CALK", "")
		|| (this.StringAt((m_current - 2), 4, "POLK", "") 
			&& !this.StringAt((m_current - 2), 5, "POLKA", "WALKO", ""))
		|| (this.StringAt((m_current - 2), 4, "HALV", "") 
			&& !this.StringAt((m_current - 2), 5, "HALVA", "HALVO", ""))
		|| (this.StringAt((m_current - 3), 5, "CAULK", "CHALK", "BAULK", "FAULK", "")
			&& !this.StringAt((m_current - 4), 6, "SCHALK", ""))
		|| (this.StringAt((m_current - 2), 5, "SALVE", "CALVE", "")
		|| this.StringAt((m_current - 2), 6, "SOLDER", ""))
		// exceptions to above cases where 'L' is usually pronounced
		&& !this.StringAt((m_current - 2), 6, "SALVER", "CALVER", ""))
		&& !this.StringAt((m_current - 5), 9, "GONSALVES", "GONCALVES", "")
		&& !this.StringAt((m_current - 2), 6, "BALKAN", "TALKAL", "")
		&& !this.StringAt((m_current - 3), 5, "PAULK", "CHALF", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode 'L' in contexts of "-OULD-" where it is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_L_In_OULD = function()
{
	//'would', 'could'
	if(this.StringAt((m_current - 3), 5, "WOULD", "COULD", "") 
		|| (this.StringAt((m_current - 4), 6, "SHOULD", "") 
			&& !this.StringAt((m_current - 4), 8, "SHOULDER", "")))
	{
		this.MetaphAddExactApprox("D", "T");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-ILLA-" and "-ILLE-" in spanish and french
 * contexts were americans know to pronounce it as a 'Y'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_LL_As_Vowel_Special_Cases = function()
{
	if(this.StringAt((m_current - 5), 8, "TORTILLA", "") 
		|| this.StringAt((m_current - 8), 11, "RATATOUILLE", "")
		// e.g. 'guillermo', "veillard"
		|| (this.StringAt(0, 5, "GUILL", "VEILL", "GAILL", "")
			// 'guillotine' usually has '-ll-' pronounced as 'L' in english 
			&& !(this.StringAt((m_current - 3), 7, "GUILLOT", "GUILLOR", "GUILLEN", "")
				|| (this.StringAt(0, 5, "GUILL", "") && (m_length == 5))))
        || this.StringAt(0, 6, "ROBILL", "")
        // e.g. "brouillard", "gremillion"
        || this.StringAt(0, 7, "BROUILL", "GREMILL", "")
		// e.g. 'mireille'
		|| (this.StringAt((m_current - 2), 5, "EILLE", "") 
				&& ((m_current + 2) == m_last)
				// exception "reveille" usually pronounced as 're-vil-lee'
				&& !this.StringAt((m_current - 5), 8, "REVEILLE", "")))
	{
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode other spanish cases where "-LL-" is pronounced as 'Y'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_LL_As_Vowel = function()
{
	//spanish e.g. "cabrillo", "gallegos" but also "gorilla", "ballerina" -
	// give both pronounciations since an american might pronounce "cabrillo"
	// in the spanish or the american fashion.
	if((((m_current + 3) == m_length) 
		&& this.StringAt((m_current - 1), 4, "ILLO", "ILLA", "ALLE", ""))
		|| (((this.StringAt((m_last - 1), 2, "AS", "OS", "")
				|| this.StringAt(m_last, 2, "AS", "OS", "")
				|| this.StringAt(m_last, 1, "A", "O", "")) 
					&& this.StringAt((m_current - 1), 2, "AL", "IL", ""))
			&& !this.StringAt((m_current - 1), 4, "ALLA", ""))
		|| this.StringAt(0, 5, "VILLE", "VILLA", "")
		|| this.StringAt(0, 8, "GALLARDO", "VALLADAR", "MAGALLAN", "CAVALLAR", "BALLASTE", "")
		|| this.StringAt(0, 3, "LLA", ""))
	{
		this.MetaphAddWithAlt("L", "");
		m_current += 2;
		return true;
	}
	return false;
}

/**
 * Call routines to encode "-LL-", in proper order
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_LL_As_Vowel_Cases = function()
{
	if(this.GetCharAt(m_current + 1) == 'L')
	{
		if(this.Encode_LL_As_Vowel_Special_Cases())
		{
			return true;
		}
		else if(this.Encode_LL_As_Vowel())
		{
			return true;
		}
		m_current += 2;

	}
	else
	{
		m_current++;
	}

	return false;
}

/**
 * Encode vowel-encoding cases where "-LE-" is pronounced "-EL-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Vowel_LE_Transposition = function(save_current)
{
	// transposition of vowel sound and L occurs in many words,
	// e.g. "bristle", "dazzle", "goggle" => KAKAL
	if(m_encodeVowels 
		&& (save_current > 1) 
		&& !this.IsVowel(save_current - 1) 
		&& (this.GetCharAt(save_current + 1) == 'E')
		&& (this.GetCharAt(save_current - 1) != 'L')
		&& (this.GetCharAt(save_current - 1) != 'R')
		// lots of exceptions to this:
		&& !this.IsVowel(save_current + 2)
		&& !this.StringAt(0, 7, "ECCLESI", "COMPLEC", "COMPLEJ", "ROBLEDO", "")
		&& !this.StringAt(0, 5, "MCCLE", "MCLEL", "")
		&& !this.StringAt(0, 6, "EMBLEM", "KADLEC", "")
		&& !(((save_current + 2) == m_last) && this.StringAt(save_current, 3, "LET", ""))
		&& !this.StringAt(save_current, 7, "LETTING", "")
		&& !this.StringAt(save_current, 6, "LETELY", "LETTER", "LETION", "LETIAN", "LETING", "LETORY", "")
		&& !this.StringAt(save_current, 5, "LETUS", "LETIV", "")
		&& !this.StringAt(save_current, 4, "LESS", "LESQ", "LECT", "LEDG", "LETE", "LETH", "LETS", "LETT", "")
		&& !this.StringAt(save_current, 3, "LEG", "LER", "LEX", "")
		// e.g. "complement" !=> KAMPALMENT
		&& !(this.StringAt(save_current, 6, "LEMENT", "")
			&& !(this.StringAt((m_current - 5), 6, "BATTLE", "TANGLE", "PUZZLE", "RABBLE", "BABBLE", "")
					|| this.StringAt((m_current - 4), 5, "TABLE", "")))
		&& !(((save_current + 2) == m_last) && this.StringAt((save_current - 2), 5, "OCLES", "ACLES", "AKLES", ""))
		&& !this.StringAt((save_current - 3), 5, "LISLE", "AISLE", "")
		&& !this.StringAt(0, 4, "ISLE", "")
		&& !this.StringAt(0, 6, "ROBLES", "")
		&& !this.StringAt((save_current - 4), 7, "PROBLEM", "RESPLEN", "")
		&& !this.StringAt((save_current - 3), 6, "REPLEN", "")
		&& !this.StringAt((save_current - 2), 4, "SPLE", "")
		&& (this.GetCharAt(save_current - 1) != 'H')
		&& (this.GetCharAt(save_current - 1) != 'W'))
	{
		this.MetaphAdd("AL");
		flag_AL_inversion = true;

		// eat redundant 'L'
		if(this.GetCharAt(save_current + 2) == 'L')
		{
			m_current = save_current + 3;
		}
		return true;
	}

	return false;
}

/**
 * Encode special vowel-encoding cases where 'E' is not
 * silent at the end of a word as is the usual case
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Vowel_Preserve_Vowel_After_L = function(save_current)
{
	// an example of where the vowel would NOT need to be preserved
	// would be, say, "hustled", where there is no vowel pronounced
	// between the 'l' and the 'd'
	if(m_encodeVowels
		&& !this.IsVowel(save_current - 1) 
		&& (this.GetCharAt(save_current + 1) == 'E')
		&& (save_current > 1) 
		&& ((save_current + 1) != m_last) 
		&& !(this.StringAt((save_current + 1), 2, "ES", "ED", "") 
		&& ((save_current + 2) == m_last))
		&& !this.StringAt((save_current - 1), 5, "RLEST", "") )
	{
		this.MetaphAdd("LA");
		m_current = this.SkipVowels(m_current);
		return true;
	}

	return false;
}

/**
 * Call routines to encode "-LE-", in proper order
 *
 * @param save_current index of actual current letter
 *
 */
Metaphone3.prototype.Encode_LE_Cases = function(save_current)
{
	if(this.Encode_Vowel_LE_Transposition(save_current))
	{
		return;
	}
	else
	{
		if(this.Encode_Vowel_Preserve_Vowel_After_L(save_current))
		{
			return;
		}
		else
		{
			this.MetaphAdd("L");
		}
	}
}

/**
 * Encode "-M-"
 * 
 */
Metaphone3.prototype.Encode_M = function()
{
	if(this.Encode_Silent_M_At_Beginning()
		|| this.Encode_MR_And_MRS()
		|| this.Encode_MAC()
		|| this.Encode_MPT())
	{
		return;
	}

	// Silent 'B' should really be handled
	// under 'B", not here under 'M'!
	this.Encode_MB();

	this.MetaphAdd("M");
}

/**
 * Encode cases where 'M' is silent at beginning of word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_M_At_Beginning = function()
{    
	//skip these when at start of word
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "MN", ""))
	{
        m_current += 1;
		return true;
	}

	return false;
}

/**
 * Encode special cases "Mr." and "Mrs."
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_MR_And_MRS = function()
{
	if((m_current == 0) && this.StringAt(m_current, 2, "MR", ""))
	{
		// exceptions for "mr." and "mrs."
		if((m_length == 2) && this.StringAt(m_current, 2, "MR", ""))
		{
			if(m_encodeVowels)
			{
				this.MetaphAdd("MASTAR");
			}
			else
			{
				this.MetaphAdd("MSTR");
			}
			m_current += 2;
			return true;
		}
		else if((m_length == 3) && this.StringAt(m_current, 3, "MRS", "")) 
		{
			if(m_encodeVowels)
			{
				this.MetaphAdd("MASAS");
			}
			else
			{
				this.MetaphAdd("MSS");
			}
			m_current += 3;
			return true;
		}
	}

	return false;
}

/**
 * Encode "Mac-" and "Mc-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_MAC = function()
{
	// should only find irish and 
	// scottish names e.g. 'macintosh'
	if((m_current == 0) 
			&& (this.StringAt(0, 7, "MACIVER", "MACEWEN", "")
			|| this.StringAt(0, 8, "MACELROY", "MACILROY", "")
			||  this.StringAt(0, 9, "MACINTOSH", "")
			|| this.StringAt(0, 2, "MC", "")	))
	{
		if(m_encodeVowels)
		{
			this.MetaphAdd("MAK");
		}
		else
		{
			this.MetaphAdd("MK");
		}
		
		if(this.StringAt(0, 2, "MC", ""))
		{	
			if(this.StringAt((m_current + 2), 1, "K", "G", "Q", "")
				// watch out for e.g. "McGeorge"
				&& !this.StringAt((m_current + 2), 4, "GEOR", ""))
			{
				m_current += 3;				
			}
			else
			{
				m_current += 2;
			}
		}
		else
		{	
			m_current += 3;
		}
			
		return true;
	}

	return false;
}

/**
 * Encode silent 'M' in context of "-MPT-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_MPT = function()
{
	if(this.StringAt((m_current - 2), 8, "COMPTROL", "")
		|| this.StringAt((m_current - 4), 7, "ACCOMPT", ""))

	{
		this.MetaphAdd("N");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Test if 'B' is silent in these contexts
 * 
 * @return true if 'B' is silent in this context
 * 
 */
Metaphone3.prototype.Test_Silent_MB_1 = function()
{
	// e.g. "LAMB", "COMB", "LIMB", "DUMB", "BOMB"
	// Handle combining roots first
	if (((m_current == 3) 
			&& this.StringAt((m_current - 3), 5, "THUMB", ""))
		|| ((m_current == 2)
			&& this.StringAt((m_current - 2), 4, "DUMB", "BOMB", "DAMN", "LAMB", "NUMB", "TOMB", "") ))
	{
		return true;
	}

	return false;
}

/**
 * Test if 'B' is pronounced in this context
 * 
 * @return true if 'B' is pronounced in this context
 * 
 */
Metaphone3.prototype.Test_Pronounced_MB = function()
{
	if (this.StringAt((m_current - 2), 6, "NUMBER", "")
		|| (this.StringAt((m_current + 2), 1, "A", "") 
			&& !this.StringAt((m_current - 2), 7, "DUMBASS", ""))
		|| this.StringAt((m_current + 2), 1, "O", "") 
		|| this.StringAt((m_current - 2), 6, "LAMBEN", "LAMBER", "LAMBET", "TOMBIG", "LAMBRE", ""))
	{
		return true;
	}

	return false;
}

/**
 * Test whether "-B-" is silent in these contexts
 * 
 * @return true if 'B' is silent in this context
 * 
 */
Metaphone3.prototype.Test_Silent_MB_2 = function()
{
	// 'M' is the current letter
	if ((this.GetCharAt(m_current + 1) == 'B') && (m_current > 1)
		&& (((m_current + 1) == m_last)
		// other situations where "-MB-" is at end of root
		// but not at end of word. The tests are for standard
		// noun suffixes.
		// e.g. "climbing" => KLMNK
		|| this.StringAt((m_current + 2), 3, "ING", "ABL", "")
		|| this.StringAt((m_current + 2), 4, "LIKE", "")
		|| ((this.GetCharAt(m_current + 2) == 'S') && ((m_current + 2) == m_last))
		|| this.StringAt((m_current - 5), 7, "BUNCOMB", "")
		// e.g. "bomber", 
		|| (this.StringAt((m_current + 2), 2, "ED", "ER", "") 
		&& ((m_current + 3) == m_last) 
		&& (this.StringAt(0, 5, "CLIMB", "PLUMB", "")
		// e.g. "beachcomber"
		|| !this.StringAt((m_current - 1), 5, "IMBER", "AMBER", "EMBER", "UMBER", ""))
		// exceptions
		&& !this.StringAt((m_current - 2), 6, "CUMBER", "SOMBER", "") ) ) )
	{
		return true;
	}

	return false;
}

/**
 * Test if 'B' is pronounced in these "-MB-" contexts
 * 
 * @return true if "-B-" is pronounced in these contexts
 * 
 */
Metaphone3.prototype.Test_Pronounced_MB_2 = function()
{
	// e.g. "bombastic", "umbrage", "flamboyant"
	if (this.StringAt((m_current - 1), 5, "OMBAS", "OMBAD", "UMBRA", "")
		|| this.StringAt((m_current - 3), 4, "FLAM", "") )
	{
		return true;
	}

	return false;
}

/**
 * Tests for contexts where "-N-" is silent when after "-M-"
 * 
 * @return true if "-N-" is silent in these contexts
 * 
 */
Metaphone3.prototype.Test_MN = function()
{

	if ((this.GetCharAt(m_current + 1) == 'N') 
		&& (((m_current + 1) == m_last)
		// or at the end of a word but followed by suffixes
		|| (this.StringAt((m_current + 2), 3, "ING", "EST", "") && ((m_current + 4) == m_last))
		|| ((this.GetCharAt(m_current + 2) == 'S') && ((m_current + 2) == m_last))
		|| (this.StringAt((m_current + 2), 2, "LY", "ER", "ED", "") 
			&& ((m_current + 3) == m_last))  
		|| this.StringAt((m_current - 2), 9, "DAMNEDEST", "")
		|| this.StringAt((m_current - 5), 9, "GODDAMNIT", "") ))
	{
		return true; 
	}

	return false;
}

/**
 * Call routines to encode "-MB-", in proper order
 * 
 */
Metaphone3.prototype.Encode_MB = function()
{
	if(this.Test_Silent_MB_1())
	{
		if(this.Test_Pronounced_MB())
		{
			m_current++;
		}
		else
		{
			m_current += 2; 
		}
	}
	else if(this.Test_Silent_MB_2())
	{
		if(this.Test_Pronounced_MB_2())
		{
			m_current++;
		}
		else
		{
			m_current += 2; 
		}
	}
	else if(this.Test_MN())
	{
		m_current += 2; 
	}
	else
	{
		// eat redundant 'M'
		if (this.GetCharAt(m_current + 1) == 'M')
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}
	}
}

/**
 * Encode "-N-"
 * 
 */
Metaphone3.prototype.Encode_N = function()
{
	if(this.Encode_NCE())
	{
		return;
	}

	// eat redundant 'N'
	if(this.GetCharAt(m_current + 1) == 'N')
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}

	if (!this.StringAt((m_current - 3), 8, "MONSIEUR", "")
		// e.g. "aloneness", 
		&& !this.StringAt((m_current - 3), 6, "NENESS", ""))
	{
		this.MetaphAdd("N");
	}
}

/**
 * Encode "-NCE-" and "-NSE-"
 * "entrance" is pronounced exactly the same as "entrants"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_NCE = function()
{
	//'acceptance', 'accountancy'
	if(this.StringAt((m_current + 1), 1, "C", "S", "")
		&& this.StringAt((m_current + 2), 1, "E", "Y", "I", "")
		&& (((m_current + 2) == m_last)
			|| (((m_current + 3) == m_last)) 
				&& (this.GetCharAt(m_current + 3) == 'S')))
	{
		this.MetaphAdd("NTS");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-P-"
 * 
 */
Metaphone3.prototype.Encode_P = function()
{
	if(this.Encode_Silent_P_At_Beginning()
	   || this.Encode_PT()
	   || this.Encode_PH()
	   || this.Encode_PPH()
	   || this.Encode_RPS()
	   || this.Encode_COUP()
	   || this.Encode_PNEUM()
	   || this.Encode_PSYCH()
	   || this.Encode_PSALM())
	{
		return;
	}

	this.Encode_PB();

	this.MetaphAdd("P");
}

/**
 * Encode cases where "-P-" is silent at the start of a word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_P_At_Beginning = function()
{
    //skip these when at start of word
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "PN", "PF", "PS", "PT", ""))
	{
        m_current += 1;
		return true;
	}

	return false;
}

/**
 * Encode cases where "-P-" is silent before "-T-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PT = function()
{
	// 'pterodactyl', 'receipt', 'asymptote'
	if((this.GetCharAt(m_current + 1) == 'T'))
	{
		if (((m_current == 0) && this.StringAt(m_current, 5, "PTERO", ""))
			|| this.StringAt((m_current - 5), 7, "RECEIPT", "")
			|| this.StringAt((m_current - 4), 8, "ASYMPTOT", ""))
		{
			this.MetaphAdd("T");
			m_current += 2;
			return true;
		}
	}
	return false;
}

/**
 * Encode "-PH-", usually as F, with exceptions for
 * cases where it is silent, or where the 'P' and 'T'
 * are pronounced seperately because they belong to 
 * two different words in a combining form
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PH = function()
{
	if(this.GetCharAt(m_current + 1) == 'H')
	{
		// 'PH' silent in these contexts
		if (this.StringAt(m_current, 9, "PHTHALEIN", "")
			|| ((m_current == 0) && this.StringAt(m_current, 4, "PHTH", ""))
			|| this.StringAt((m_current - 3), 10, "APOPHTHEGM", ""))
		{
			this.MetaphAdd("0");
			m_current += 4;
		}
		// combining forms
		//'sheepherd', 'upheaval', 'cupholder'
		else if((m_current > 0)
			&& (this.StringAt((m_current + 2), 3, "EAD", "OLE", "ELD", "ILL", "OLD", "EAP", "ERD", 
											 "ARD", "ANG", "ORN", "EAV", "ART", "")
				|| this.StringAt((m_current + 2), 4, "OUSE", "")
				|| (this.StringAt((m_current + 2), 2, "AM", "") && !this.StringAt((m_current -1), 5, "LPHAM", ""))
				|| this.StringAt((m_current + 2), 5, "AMMER", "AZARD", "UGGER", "")
				|| this.StringAt((m_current + 2), 6, "OLSTER", ""))
					&& !this.StringAt((m_current - 3), 5, "LYMPH", "NYMPH", ""))
		{
			this.MetaphAdd("P");
			this.AdvanceCounter(3, 2);
		}
		else
		{
			if(this.StringAt((m_current - 3), 7, "STEPHEN", "")
					&& m_encodeExact)
			{
				this.MetaphAdd("V");
			}
			else
			{
				this.MetaphAdd("F");
			}
			m_current += 2;
		}
		return true;
	}

	return false;
}

/**
 * Encode "-PPH-". I don't know why the greek poet's
 * name is transliterated this way...
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PPH = function()
{
	// 'sappho'
	if((this.GetCharAt(m_current + 1) == 'P') 
			&& ((m_current + 2) < m_length) && (this.GetCharAt(m_current + 2) == 'H'))
	{
		this.MetaphAdd("F");
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode "-CORPS-" where "-PS-" not pronounced
 * since the cognate is here from the french
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_RPS = function()
{
	//'-corps-', 'corpsman'
	if(this.StringAt((m_current - 3), 5, "CORPS", "") 
		&& !this.StringAt((m_current - 3), 6, "CORPSE", ""))
	{
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-COUP-" where "-P-" is not pronounced
 * since the word is from the french
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_COUP = function()
{
	//'coup'
	if((m_current == m_last) 
		&& this.StringAt((m_current - 3), 4, "COUP", "")
		&& !this.StringAt((m_current - 5), 6, "RECOUP", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode 'P' in non-initial contexts of "-PNEUM-" 
 * where is also silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PNEUM = function()
{
	//'-pneum-'
	if(this.StringAt((m_current + 1), 4, "NEUM", ""))
	{
		this.MetaphAdd("N");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode special case "-PSYCH-" where two encodings need to be
 * accounted for in one syllable, one for the 'PS' and one for
 * the 'CH'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PSYCH = function()
{
	//'-psych-'
	if(this.StringAt((m_current + 1), 4, "SYCH", ""))
	{
		if(m_encodeVowels)
		{
			this.MetaphAdd("SAK");
		}
		else
		{
			this.MetaphAdd("SK");
		}

		m_current += 5;
		return true;
	}

	return false;
}

/**
 * Encode 'P' in context of "-PSALM-", where it has
 * become silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_PSALM = function()
{
	//'-psalm-'
	if(this.StringAt((m_current + 1), 4, "SALM", ""))
	{
		// go ahead and encode entire word
		if(m_encodeVowels)
		{
			this.MetaphAdd("SAM");
		}
		else
		{
			this.MetaphAdd("SM");
		}

		m_current += 5;
		return true;
	}

	return false;
}

/**
 * Eat redundant 'B' or 'P'
 *
 */
Metaphone3.prototype.Encode_PB = function()
{
	// e.g. "campbell", "raspberry"
	// eat redundant 'P' or 'B'
	if(this.StringAt((m_current + 1), 1, "P", "B", ""))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encode "-Q-"
 * 
 */
Metaphone3.prototype.Encode_Q = function()
{
	// current pinyin
	if(this.StringAt(m_current, 3, "QIN", ""))
	{
		this.MetaphAdd("X");
		m_current++;
		return;
	}

	// eat redundant 'Q'
	if(this.GetCharAt(m_current + 1) == 'Q')
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}

	this.MetaphAdd("K");
}

/**
 * Encode "-R-"
 * 
 */
Metaphone3.prototype.Encode_R = function()
{
	if(this.Encode_RZ())
	{
		return;
	}
	
	if(!this.Test_Silent_R())
	{
		if(!this.Encode_Vowel_RE_Transposition())
		{
			this.MetaphAdd("R");
		}
	}
	
	// eat redundant 'R'; also skip 'S' as well as 'R' in "poitiers"
	if((this.GetCharAt(m_current + 1) == 'R') || this.StringAt((m_current - 6), 8, "POITIERS", ""))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encode "-RZ-" according
 * to american and polish pronunciations
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_RZ = function()
{
	if(this.StringAt((m_current - 2), 4, "GARZ", "KURZ", "MARZ", "MERZ", "HERZ", "PERZ", "WARZ", "")
		|| this.StringAt(m_current, 5, "RZANO", "RZOLA", "")
		|| this.StringAt((m_current - 1), 4, "ARZA", "ARZN", "")
		|| this.StringAt(m_current, 3, "RZH", ""))
	{
		return false;
	}
	
	// 'yastrzemski' usually has 'z' silent in
	// united states, but should get 'X' in poland
	if(this.StringAt((m_current - 4), 11, "YASTRZEMSKI", ""))
	{
		this.MetaphAddWithAlt("R", "X");
		m_current += 2;
		return true;
	}
	// 'BRZEZINSKI' gets two pronunciations
	// in the united states, neither of which
	// are authentically polish
	if(this.StringAt((m_current - 1), 10, "BRZEZINSKI", ""))
	{
		this.MetaphAddWithAlt("RS", "RJ");
		// skip over 2nd 'Z'
		m_current += 4;
		return true;
	}
	// 'z' in 'rz after voiceless consonant gets 'X'
	// in alternate polish style pronunciation
	else if(this.StringAt((m_current - 1), 3, "TRZ", "PRZ", "KRZ", "")
			|| (this.StringAt(m_current, 2, "RZ", "")
					&& (this.IsVowel(m_current - 1) || (m_current == 0))))
	{
		this.MetaphAddWithAlt("RS", "X");
		m_current += 2;
		return true;
	}
	// 'z' in 'rz after voiceled consonant, vowel, or at
	// beginning gets 'J' in alternate polish style pronunciation
	else if(this.StringAt((m_current - 1), 3, "BRZ", "DRZ", "GRZ", ""))
	{
		this.MetaphAddWithAlt("RS", "J");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Test whether 'R' is silent in this context
 *
 * @return true if 'R' is silent in this context
 * 
 */
Metaphone3.prototype.Test_Silent_R = function()
{
	// special case
	if (this.StringAt((m_current - 3), 8, "FEBRUARY", ""))
	{
		// more common without, but sometimes pronounced
		this.MetaphAddWithAlt("", "R");
		return true;	// since handled here	
	}
	
	// test cases where 'R' is silent, either because the 
	// word is from the french or because it is no longer pronounced.
	// e.g. "rogier", "monsieur", "surburban"
	if(((m_current == m_last)
		// reliably french word ending
		&& this.StringAt((m_current - 2), 3, "IER", "")
		// e.g. "metier"
		&& (this.StringAt((m_current - 5), 3, "MET", "VIV", "LUC", "")
		// e.g. "cartier", "bustier"
		|| this.StringAt((m_current - 6), 4, "CART", "DOSS", "FOUR", "OLIV", "BUST", "DAUM", "ATEL", 
										"SONN", "CORM", "MERC", "PELT", "POIR", "BERN", "FORT", "GREN", 
										"SAUC", "GAGN", "GAUT", "GRAN", "FORC", "MESS", "LUSS", "MEUN", 
										"POTH", "HOLL", "CHEN", "")
		// e.g. "croupier"
		|| this.StringAt((m_current - 7), 5, "CROUP", "TORCH", "CLOUT", "FOURN", "GAUTH", "TROTT", 
										"DEROS", "CHART", "")
		// e.g. "chevalier"
		|| this.StringAt((m_current - 8), 6, "CHEVAL", "LAVOIS", "PELLET", "SOMMEL", "TREPAN", "LETELL", "COLOMB", "")
		|| this.StringAt((m_current - 9), 7, "CHARCUT", "")
		|| this.StringAt((m_current - 10), 8, "CHARPENT", "")))
		|| this.StringAt((m_current - 2), 7, "SURBURB", "WORSTED", "")
		|| this.StringAt((m_current - 2), 9, "WORCESTER", "")
		|| this.StringAt((m_current - 7), 8, "MONSIEUR", "")
		|| this.StringAt((m_current - 6), 8, "POITIERS", "") )
	{
		return true;
	}

	return false;
}

/**
 * Encode '-re-" as 'AR' in contexts
 * where this is the correct pronunciation
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Vowel_RE_Transposition = function()
{
	// -re inversion is just like
	// -le inversion
	// e.g. "fibre" => FABAR or "centre" => SANTAR
	if((m_encodeVowels)
		&& (this.GetCharAt(m_current + 1) == 'E')
		&& (m_length > 3)
		&& !this.StringAt(0, 5, "OUTRE", "LIBRE", "ANDRE", "")
		&& !(this.StringAt(0, 4, "FRED", "TRES", "") && (m_length == 4))
		&& !this.StringAt((m_current - 2), 5, "LDRED", "LFRED", "NDRED", "NFRED", "NDRES", "IFRED", "")
        && !(this.StringAt((m_current - 2), 4, "TRES", "") && ((m_current + 1) < m_last))
		&& !this.IsVowel(m_current - 1)
		&& !(this.IsVowel(m_current - 2) && (this.GetCharAt(m_current - 1) == 'H')) // e.g. "myhre", "bahre"
		&& (((m_current + 1) == m_last)
			|| (((m_current + 2) == m_last) 
					&& this.StringAt((m_current + 2), 1, "D", "S", ""))))
	{
		this.MetaphAdd("AR");
		return true;
	}

	return false;
}

/**
 * Encode "-S-"
 * 
 */
Metaphone3.prototype.Encode_S = function()
{
	if(this.Encode_SKJ()
		|| this.Encode_SR()
		|| this.Encode_Special_SW()
		|| this.Encode_SJ()
		|| this.Encode_Silent_French_S_Final()
		|| this.Encode_Silent_French_S_Internal()
		|| this.Encode_ISL()
		|| this.Encode_STL()
		|| this.Encode_Christmas()
		|| this.Encode_STHM()
		|| this.Encode_ISTEN()
		|| this.Encode_Sugar()
		|| this.Encode_SH()
		|| this.Encode_SCH()
		|| this.Encode_SUR()
		|| this.Encode_SU()
		|| this.Encode_SSIO()
		|| this.Encode_SS()
		|| this.Encode_SIA()
		|| this.Encode_SIO()
		|| this.Encode_Anglicisations()
		|| this.Encode_SC()
		|| this.Encode_SEA_SUI_SIER()
		|| this.Encode_SEA())
	{
		return;
	}

	this.MetaphAdd("S");

	if(this.StringAt((m_current + 1), 1, "S", "Z", "")
		&& !this.StringAt((m_current + 1), 2, "SH", ""))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encode "SRI-" and "SRE-" as XR
 * except for "sriracha" where the first 'R' is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SR = function()
{
	// popular hot sauce - first 'R' silent
	if(this.StringAt(0, 8, "SRIRACHA", ""))
	{
		this.MetaphAdd("S");
		m_current += 2;
		return true;
	}
	
	// hindi "SRI-" and bosnian "SRE-"
	if(this.StringAt(0, 3, "SRI", "SRE", ""))
	{
		this.MetaphAddWithAlt("X", "S");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode a couple of contexts where scandinavian, slavic
 * or german names should get an alternate, native 
 * pronunciation of 'SV' or 'XV'
 * 
 * @return true if handled
 * 
 */
Metaphone3.prototype.Encode_Special_SW = function()
{
	if(m_current == 0)
	{
		// 
		if(this.Names_Beginning_With_SW_That_Get_Alt_SV())
		{
			this.MetaphAddWithAlt("S", "SV");
			m_current += 2;
			return true;
		}

		// 
		if(this.Names_Beginning_With_SW_That_Get_Alt_XV())
		{
			this.MetaphAddWithAlt("S", "XV");
			m_current += 2;
			return true;
		}
	}
	
	return false;
}

/**
 * Encode "-SKJ-" as X ("sh"), since americans pronounce
 * the name Dag Hammerskjold as "hammer-shold"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SKJ = function()
{
	// scandinavian
	if(this.StringAt(m_current, 4, "SKJO", "SKJU", "")
		&& this.IsVowel(m_current + 3))
	{
		this.MetaphAdd("X");
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode initial swedish "SJ-" as X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SJ = function()
{
	if(this.StringAt(0, 2, "SJ", ""))
	{
		this.MetaphAdd("X");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode final 'S' in words from the french, where they
 * are not pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_French_S_Final = function()
{
	// "louis" is an exception because it gets two pronuncuations
	if(this.StringAt(0, 5, "LOUIS", "") && (m_current == m_last))
	{
		this.MetaphAddWithAlt("S", "");
		m_current++;
		return true;			
	}
			
	// french words familiar to americans where final s is silent
	if((m_current == m_last) 
		&& (this.StringAt(0, 4, "YVES", "")
		|| (this.StringAt(0, 4, "HORS", "") && (m_current == 3))
		|| this.StringAt((m_current - 4), 5, "CAMUS", "YPRES", "")
		|| this.StringAt((m_current - 5), 6, "MESNES", "DEBRIS", "BLANCS", "INGRES", "CANNES", "")
		|| this.StringAt((m_current - 6), 7, "CHABLIS", "APROPOS", "JACQUES", "ELYSEES", "OEUVRES", 
										"GEORGES", "DESPRES", "")
		|| this.StringAt(0, 8, "ARKANSAS", "FRANCAIS", "CRUDITES", "BRUYERES", "")
		|| this.StringAt(0, 9, "DESCARTES", "DESCHUTES", "DESCHAMPS", "DESROCHES", "DESCHENES", "")
		|| this.StringAt(0, 10, "RENDEZVOUS", "")
		|| this.StringAt(0, 11, "CONTRETEMPS", "DESLAURIERS", ""))
		|| ((m_current == m_last) 
				&& this.StringAt((m_current - 2), 2, "AI", "OI", "UI", "") 
				&& !this.StringAt(0, 4, "LOIS", "LUIS", "")))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode non-final 'S' in words from the french where they
 * are not pronounced.
 * 
 * @return true if encoding handled in this routine, false if not
 *
 */
Metaphone3.prototype.Encode_Silent_French_S_Internal = function()
{
	// french words familiar to americans where internal s is silent
	if(this.StringAt((m_current - 2), 9, "DESCARTES", "")
		|| this.StringAt((m_current - 2), 7, "DESCHAM", "DESPRES", "DESROCH", "DESROSI", "DESJARD", "DESMARA", 
					"DESCHEN", "DESHOTE", "DESLAUR", "")
		|| this.StringAt((m_current - 2), 6, "MESNES", "")
		|| this.StringAt((m_current - 5), 8, "DUQUESNE", "DUCHESNE", "")
		|| this.StringAt((m_current - 7), 10, "BEAUCHESNE", "")
		|| this.StringAt((m_current - 3), 7, "FRESNEL", "")
		|| this.StringAt((m_current - 3), 9, "GROSVENOR", "")
		|| this.StringAt((m_current - 4), 10, "LOUISVILLE", "")
		|| this.StringAt((m_current - 7), 10, "ILLINOISAN", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode silent 'S' in context of "-ISL-"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ISL = function()
{
	//special cases 'island', 'isle', 'carlisle', 'carlysle'
	if((this.StringAt((m_current - 2), 4, "LISL", "LYSL", "AISL", "") 
		&& !this.StringAt((m_current - 3), 7, "PAISLEY", "BAISLEY", "ALISLAM", "ALISLAH", "ALISLAA", ""))
		|| ((m_current == 1) 
			&& ((this.StringAt((m_current - 1), 4, "ISLE", "") 
				|| this.StringAt((m_current - 1), 5, "ISLAN", ""))
				&& !this.StringAt((m_current - 1), 5, "ISLEY", "ISLER", ""))))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-STL-" in contexts where the 'T' is silent. Also
 * encode "-USCLE-" in contexts where the 'C' is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_STL = function()
{
	//'hustle', 'bustle', 'whistle'
	if((this.StringAt(m_current, 4, "STLE", "STLI", "") 
			&& !this.StringAt((m_current + 2), 4, "LESS", "LIKE", "LINE", ""))
		|| this.StringAt((m_current - 3), 7, "THISTLY", "BRISTLY",  "GRISTLY", "")
		// e.g. "corpuscle"
		|| this.StringAt((m_current - 1), 5, "USCLE", ""))
	{
		// KRISTEN, KRYSTLE, CRYSTLE, KRISTLE all pronounce the 't'
		// also, exceptions where "-LING" is a nominalizing suffix
		if(this.StringAt(0, 7, "KRISTEN", "KRYSTLE", "CRYSTLE", "KRISTLE", "")
			|| this.StringAt(0, 11, "CHRISTENSEN", "CHRISTENSON", "")
			|| this.StringAt((m_current - 3), 9, "FIRSTLING", "")
			|| this.StringAt((m_current - 2), 8,  "NESTLING",  "WESTLING", ""))
		{
			this.MetaphAdd("ST");
			m_current += 2;
		}
		else
		{
			if(m_encodeVowels 
				&& (this.GetCharAt(m_current + 3) == 'E') 
				&& (this.GetCharAt(m_current + 4) != 'R')
				&& !this.StringAt((m_current + 3), 4, "ETTE", "ETTA", "")
				&& !this.StringAt((m_current + 3), 2, "EY", ""))
			{
				this.MetaphAdd("SAL");
				flag_AL_inversion = true;			
			}
			else
			{
				this.MetaphAdd("SL");
			}
			m_current += 3;
		}
		return true;
	}

	return false;
}

/**
 * Encode "christmas". Americans always pronounce this as "krissmuss"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Christmas = function()
{
	//'christmas'
	if(this.StringAt((m_current - 4), 8, "CHRISTMA", ""))
	{
		this.MetaphAdd("SM");
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode "-STHM-" in contexts where the 'TH'
 * is silent.
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_STHM = function()
{
	//'asthma', 'isthmus'
	if(this.StringAt(m_current, 4, "STHM", ""))
	{
		this.MetaphAdd("SM");
		m_current += 4;
		return true;
	}

	return false;
}

/**
 * Encode "-ISTEN-" and "-STNT-" in contexts
 * where the 'T' is silent
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ISTEN = function()
{
	// 't' is silent in verb, pronounced in name
	if(this.StringAt(0, 8, "CHRISTEN", ""))
	{
		// the word itself
		if(this.RootOrInflections(m_inWord, "CHRISTEN")
			|| this.StringAt(0, 11, "CHRISTENDOM", ""))
		{
			this.MetaphAddWithAlt("S", "ST");
		}
		else
		{
			// e.g. 'christenson', 'christene'				
			this.MetaphAdd("ST");				
		}
		m_current += 2;
		return true;
	}
	
	//e.g. 'glisten', 'listen'
	if(this.StringAt((m_current - 2), 6, "LISTEN", "RISTEN", "HASTEN", "FASTEN", "MUSTNT", "")
		|| this.StringAt((m_current - 3), 7,  "MOISTEN", ""))
	{
		this.MetaphAdd("S");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode special case "sugar"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Sugar = function()
{
	//special case 'sugar-'
	if(this.StringAt(m_current, 5, "SUGAR", ""))
	{
		this.MetaphAdd("X");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-SH-" as X ("sh"), except in cases
 * where the 'S' and 'H' belong to different combining
 * roots and are therefore pronounced seperately
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SH = function()
{
	if(this.StringAt(m_current, 2, "SH", ""))
	{
		// exception
		if(this.StringAt((m_current - 2), 8, "CASHMERE", ""))
		{
			this.MetaphAdd("J");				
			m_current += 2;
			return true;
		}
		
		//combining forms, e.g. 'clotheshorse', 'woodshole'
		if((m_current > 0)
			// e.g. "mishap"
			&& ((this.StringAt((m_current + 1), 3, "HAP", "") && ((m_current + 3) == m_last))
			// e.g. "hartsheim", "clothshorse"
			|| this.StringAt((m_current + 1), 4, "HEIM", "HOEK", "HOLM", "HOLZ", "HOOD", "HEAD", "HEID", 
										    "HAAR", "HORS", "HOLE", "HUND", "HELM", "HAWK", "HILL", "")
			// e.g. "dishonor"
			|| this.StringAt((m_current + 1), 5, "HEART", "HATCH", "HOUSE", "HOUND", "HONOR", "")
			// e.g. "mishear"
			|| (this.StringAt((m_current + 2), 3, "EAR", "") && ((m_current + 4) == m_last))
			// e.g. "hartshorn"
			|| (this.StringAt((m_current + 2), 3, "ORN", "") && !this.StringAt((m_current - 2), 7, "UNSHORN", ""))
			// e.g. "newshour" but not "bashour", "manshour"
			|| (this.StringAt((m_current + 1), 4, "HOUR", "") 
				&& !(this.StringAt(0, 7, "BASHOUR", "") || this.StringAt(0, 8, "MANSHOUR", "") || this.StringAt(0, 6, "ASHOUR", "") ))
			// e.g. "dishonest", "grasshopper"
			|| this.StringAt((m_current + 2), 5, "ARMON", "ONEST", "ALLOW", "OLDER", "OPPER", "EIMER", "ANDLE", "ONOUR", "")
			// e.g. "dishabille", "transhumance"
			|| this.StringAt((m_current + 2), 6, "ABILLE", "UMANCE", "ABITUA", "")))
		{
			if (!this.StringAt((m_current - 1), 1, "S", ""))
				this.MetaphAdd("S");
		}
		else
		{
			this.MetaphAdd("X");
		}

		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-SCH-" in cases where the 'S' is pronounced
 * seperately from the "CH", in words from the dutch, italian,
 * and greek where it can be pronounced SK, and german words
 * where it is pronounced X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SCH = function()
{
	// these words were combining forms many centuries ago
	if(this.StringAt((m_current + 1), 2, "CH", ""))
	{
		if((m_current > 0)
			// e.g. "mischief", "escheat"
			&& (this.StringAt((m_current + 3), 3, "IEF", "EAT", "")
			// e.g. "mischance"
			|| this.StringAt((m_current + 3), 4, "ANCE", "ARGE", "")
			// e.g. "eschew"
			|| this.StringAt(0, 6, "ESCHEW", "")))
		{
			this.MetaphAdd("S");
			m_current++;
			return true;
		}

		//Schlesinger's rule
		//dutch, danish, italian, greek origin, e.g. "school", "schooner", "schiavone", "schiz-"
		if((this.StringAt((m_current + 3), 2, "OO", "ER", "EN", "UY", "ED", "EM", "IA", "IZ", "IS", "OL", "")
				&& !this.StringAt(m_current, 6, "SCHOLT", "SCHISL", "SCHERR", ""))
			|| this.StringAt((m_current + 3), 3, "ISZ", "")
			|| (this.StringAt((m_current - 1), 6, "ESCHAT", "ASCHIN", "ASCHAL", "ISCHAE", "ISCHIA", "")
					&& !this.StringAt((m_current - 2), 8, "FASCHING", ""))
			|| (this.StringAt((m_current - 1), 5, "ESCHI", "")  && ((m_current + 3) == m_last))
			|| (this.GetCharAt(m_current + 3) == 'Y'))
		{
			// e.g. "schermerhorn", "schenker", "schistose"
			if(this.StringAt((m_current + 3), 2, "ER", "EN", "IS", "")
				&& (((m_current + 4) == m_last) 
					|| this.StringAt((m_current + 3), 3, "ENK", "ENB", "IST", "")))
			{
				this.MetaphAddWithAlt("X", "SK");
			}
			else
			{
				this.MetaphAdd("SK");
			}
			m_current += 3;
			return true;
		}
		else
		{	
			this.MetaphAdd("X");
			m_current += 3;
			return true;
		}
	}

	return false;
}

/**
 * Encode "-SUR<E,A,Y>-" to J, unless it is at the beginning,
 * or preceeded by 'N', 'K', or "NO"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SUR = function()
{
	// 'erasure', 'usury'
	if(this.StringAt((m_current + 1), 3, "URE", "URA", "URY", ""))
	{
		//'sure', 'ensure'
		if ((m_current == 0)
			|| this.StringAt((m_current - 1), 1, "N", "K", "")
			|| this.StringAt((m_current - 2), 2, "NO", ""))
		{
			this.MetaphAdd("X");
		}
		else
		{
			this.MetaphAdd("J");
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-SU<O,A>-" to X ("sh") unless it is preceeded by
 * an 'R', in which case it is encoded to S, or it is
 * preceeded by a vowel, in which case it is encoded to J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SU = function()
{
	//'sensuous', 'consensual'
	if(this.StringAt((m_current + 1), 2, "UO", "UA", "") && (m_current != 0))
	{
		// exceptions e.g. "persuade"
		if(this.StringAt((m_current - 1), 4, "RSUA", ""))
		{
			this.MetaphAdd("S");
		}
		// exceptions e.g. "casual"
		else if(this.IsVowel(m_current - 1))
		{
			this.MetaphAddWithAlt("J", "S");
		}
		else
		{
			this.MetaphAddWithAlt("X", "S");
		}

		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encodes "-SSIO-" in contexts where it is pronounced
 * either J or X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SSIO = function()
{
	if(this.StringAt((m_current + 1), 4, "SION", ""))
	{
		//"abcission"
		if (this.StringAt((m_current - 2), 2, "CI", ""))
		{
			this.MetaphAdd("J");
		}
		//'mission'
		else
		{
			if (this.IsVowel(m_current - 1))
			{
				this.MetaphAdd("X");
			}
		}

		this.AdvanceCounter(4, 2);
		return true;
	}

	return false;
}

/**
 * Encode "-SS-" in contexts where it is pronounced X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SS = function()
{
	// e.g. "russian", "pressure"
	if(this.StringAt((m_current - 1), 5, "USSIA", "ESSUR", "ISSUR", "ISSUE", "")
		// e.g. "hessian", "assurance"
		|| this.StringAt((m_current - 1), 6, "ESSIAN", "ASSURE", "ASSURA", "ISSUAB", "ISSUAN", "ASSIUS", ""))
	{
		this.MetaphAdd("X");
		this.AdvanceCounter(3, 2);
		return true;
	}

	return false;
}

/**
 * Encodes "-SIA-" in contexts where it is pronounced
 * as X ("sh"), J, or S
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SIA = function()
{
	// e.g. "controversial", also "fuchsia", "ch" is silent
	if(this.StringAt((m_current - 2), 5, "CHSIA", "")
		|| this.StringAt((m_current - 1), 5, "RSIAL", ""))
	{
		this.MetaphAdd("X");
		this.AdvanceCounter(3, 1);
		return true;
	}
	
	// names generally get 'X' where terms, e.g. "aphasia" get 'J'
	if((this.StringAt(0, 6, "ALESIA", "ALYSIA", "ALISIA", "STASIA", "")
			&& (m_current == 3)
			&& !this.StringAt(0, 9, "ANASTASIA", ""))
		|| this.StringAt((m_current - 5), 9, "DIONYSIAN", "")
		|| this.StringAt((m_current - 5), 8, "THERESIA", ""))
	{
		this.MetaphAddWithAlt("X", "S");
		this.AdvanceCounter(3, 1);
		return true;
	}

	if((this.StringAt(m_current, 3, "SIA", "") && ((m_current + 2) == m_last)) 
		|| (this.StringAt(m_current, 4, "SIAN", "") && ((m_current + 3) == m_last))
		|| this.StringAt((m_current - 5), 9, "AMBROSIAL", ""))
	{
		if ((this.IsVowel(m_current - 1) || this.StringAt((m_current - 1), 1, "R", ""))
			// exclude compounds based on names, or french or greek words
			&& !(this.StringAt(0, 5, "JAMES", "NICOS", "PEGAS", "PEPYS", "")
			|| this.StringAt(0, 6, "HOBBES", "HOLMES", "JAQUES", "KEYNES", "")
			|| this.StringAt(0, 7, "MALTHUS", "HOMOOUS", "")
			|| this.StringAt(0, 8, "MAGLEMOS", "HOMOIOUS", "")
			|| this.StringAt(0, 9, "LEVALLOIS", "TARDENOIS", "") 
			|| this.StringAt((m_current - 4), 5, "ALGES", "") ))
		{
			this.MetaphAdd("J");
		}
		else
		{
			this.MetaphAdd("S");
		}
		
		this.AdvanceCounter(2, 1);
		return true;
	}
	return false;
}

/**
 * Encodes "-SIO-" in contexts where it is pronounced
 * as J or X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SIO = function()
{
	// special case, irish name
	if(this.StringAt(0, 7, "SIOBHAN", ""))
	{
		this.MetaphAdd("X");
		this.AdvanceCounter(3, 1);
		return true;
	}
	
	if(this.StringAt((m_current + 1), 3, "ION", ""))
	{
		// e.g. "vision", "version"
		if (this.IsVowel(m_current - 1) || this.StringAt((m_current - 2), 2, "ER", "UR", ""))
		{
			this.MetaphAdd("J");
		}
		else // e.g. "declension"
		{
			this.MetaphAdd("X");
		}

		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode cases where "-S-" might well be from a german name
 * and add encoding of german pronounciation in alternate m_metaph
 * so that it can be found in a genealogical search
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Anglicisations = function()
{
	//german & anglicisations, e.g. 'smith' match 'schmidt', 'snider' match 'schneider'
	//also, -sz- in slavic language altho in hungarian it is pronounced 's'
	if(((m_current == 0) 
		&& this.StringAt((m_current + 1), 1, "M", "N", "L", ""))
		|| this.StringAt((m_current + 1), 1, "Z", ""))
	{
		this.MetaphAddWithAlt("S", "X");

		// eat redundant 'Z'
		if(this.StringAt((m_current + 1), 1, "Z", ""))
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}

		return true;
	}

	return false;
}

/**
 * Encode "-SC<vowel>-" in contexts where it is silent,
 * or pronounced as X ("sh"), S, or SK
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SC = function()
{
	if(this.StringAt(m_current, 2, "SC", ""))
	{
		// exception 'viscount'
		if(this.StringAt((m_current - 2), 8, "VISCOUNT", ""))
		{
			m_current += 1;
			return true;
		}

		// encode "-SC<front vowel>-"
		if(this.StringAt((m_current + 2), 1, "I", "E", "Y", ""))
		{
			// e.g. "conscious"
			if(this.StringAt((m_current + 2), 4, "IOUS", "") 
				// e.g. "prosciutto"
				|| this.StringAt((m_current + 2), 3, "IUT", "")
				|| this.StringAt((m_current - 4), 9, "OMNISCIEN", "")
				// e.g. "conscious"
				|| this.StringAt((m_current - 3), 8, "CONSCIEN", "CRESCEND", "CONSCION", "")
				|| this.StringAt((m_current - 2), 6, "FASCIS", ""))
			{
				this.MetaphAdd("X");
			}
			else if(this.StringAt(m_current, 7, "SCEPTIC", "SCEPSIS", "")
						|| this.StringAt(m_current, 5, "SCIVV", "SCIRO", "")
						// commonly pronounced this way in u.s.
						|| this.StringAt(m_current, 6, "SCIPIO", "")
						|| this.StringAt((m_current - 2), 10, "PISCITELLI", ""))
			{
				this.MetaphAdd("SK");
			}
			else
			{
				this.MetaphAdd("S");
			}
			m_current += 2;
			return true;
		}

		this.MetaphAdd("SK");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-S<EA,UI,IER>-" in contexts where it is pronounced
 * as J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SEA_SUI_SIER = function()
{
	// "nausea" by itself has => NJ as a more likely encoding. Other forms
	// using "nause-" (see Encode_SEA()) have X or S as more familiar pronounciations
	if((this.StringAt((m_current - 3), 6, "NAUSEA", "") && ((m_current + 2) == m_last))
		// e.g. "casuistry", "frasier", "hoosier"
		|| this.StringAt((m_current - 2), 5, "CASUI", "")
		|| (this.StringAt((m_current - 1), 5, "OSIER", "ASIER", "")
				&& !(this.StringAt(0, 6, "EASIER","") 
					|| this.StringAt(0, 5, "OSIER","") 
					|| this.StringAt((m_current - 2), 6, "ROSIER", "JOSIER", "COSIER", "NOSIER", ""))))
	{
		this.MetaphAddWithAlt("J", "X");
		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode cases where "-SE-" is pronounced as X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_SEA = function()
{
	if((this.StringAt(0, 4, "SEAN", "") && ((m_current + 3) == m_last))
		|| (this.StringAt((m_current - 3), 6, "NAUSEO", "")
		&& !this.StringAt((m_current - 3), 7, "NAUSEAT", "")))
	{
		this.MetaphAdd("X");
		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-T-"
 * 
 */
Metaphone3.prototype.Encode_T = function()
{
	if(this.Encode_T_Initial()
		|| this.Encode_TCH()
		|| this.Encode_Silent_French_T()
		|| this.Encode_TUN_TUL_TUA_TUO()
		|| this.Encode_TUE_TEU_TEOU_TUL_TIE()
		|| this.Encode_TUR_TIU_Suffixes()
		|| this.Encode_TI()
		|| this.Encode_TIENT()
		|| this.Encode_TSCH()
		|| this.Encode_TZSCH()
		|| this.Encode_TH_Pronounced_Separately()
		|| this.Encode_TTH()
		|| this.Encode_TH())
	{
		return;
	}

	// eat redundant 'T' or 'D'
	if(this.StringAt((m_current + 1), 1, "T", "D", ""))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}

	this.MetaphAdd("T");
}

/**
 * Encode some exceptions for initial 'T'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_T_Initial = function()
{
	if(m_current == 0)
	{
		// americans usually pronounce "tzar" as "zar"
		if (this.StringAt((m_current + 1), 3, "SAR", "ZAR", ""))
		{
			m_current++;
			return true;
		}
		
		// "tx-" e.g. "Txalaka" basque spelling pronounced as "tch"
		if (this.StringAt((m_current + 1), 1, "X", ""))
		{
			this.MetaphAdd("X");
			m_current += 2;
			return true;
		}
		
		// old 'École française d'Extrême-Orient' chinese pinyin where 'ts-' => 'X'
		if (((m_length == 3) && this.StringAt((m_current + 1), 2, "SO", "SA", "SU", ""))
			||	((m_length == 4) && this.StringAt((m_current + 1), 3, "SAO", "SAI", ""))
			||	((m_length == 5) && this.StringAt((m_current + 1), 4, "SING", "SANG", "")))
		{
			this.MetaphAdd("X");
			this.AdvanceCounter(3, 2);
			return true;
		}
		
		// "TS<vowel>-" at start can be pronounced both with and without 'T'
		if (this.StringAt((m_current + 1), 1, "S", "") && this.IsVowel(m_current + 2))
		{
			this.MetaphAddWithAlt("TS", "S");
			this.AdvanceCounter(3, 2);
			return true;
		}
		
		// e.g. "Tjaarda"
		if (this.StringAt((m_current + 1), 1, "J", ""))
		{
			this.MetaphAdd("X");
			this.AdvanceCounter(3, 2);
			return true;
		}

		// cases where initial "TH-" is pronounced as T and not 0 ("th")
		if ((this.StringAt((m_current + 1), 2, "HU", "") && (m_length == 3))
			|| this.StringAt((m_current + 1), 3, "HAI", "HUY", "HAO", "")
			|| this.StringAt((m_current + 1), 4, "HYME", "HYMY", "HANH", "")
			|| this.StringAt((m_current + 1), 5, "HERES", ""))
		{
			this.MetaphAdd("T");
			this.AdvanceCounter(3, 2);
			return true;
		}
	}

	return false;
}

/**
 * Encode "-TCH-", reliably X ("sh", or in this case, "ch")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TCH = function()
{
	if(this.StringAt((m_current + 1), 2, "CH", ""))
	{
		this.MetaphAdd("X");
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode the many cases where americans are aware that a certain word is
 * french and know to not pronounce the 'T'
 * 
 * @return true if encoding handled in this routine, false if not
 * TOUCHET CHABOT BENOIT
 */
Metaphone3.prototype.Encode_Silent_French_T = function()
{
	// french silent T familiar to americans
	if(((m_current == m_last) && this.StringAt((m_current - 4), 5, "MONET", "GENET", "CHAUT", ""))
		|| this.StringAt((m_current - 2), 9, "POTPOURRI", "")
		|| this.StringAt((m_current - 3), 9, "BOATSWAIN", "")
		|| this.StringAt((m_current - 3), 8, "MORTGAGE", "")
		|| (this.StringAt((m_current - 4), 5, "BERET", "BIDET", "FILET", "DEBUT", "DEPOT", "PINOT", "TAROT", "")
		|| this.StringAt((m_current - 5), 6, "BALLET", "BUFFET", "CACHET", "CHALET", "ESPRIT", "RAGOUT", "GOULET",
										"CHABOT", "BENOIT", "")
		|| this.StringAt((m_current - 6), 7, "GOURMET", "BOUQUET", "CROCHET", "CROQUET", "PARFAIT", "PINCHOT", 
										"CABARET", "PARQUET", "RAPPORT", "TOUCHET", "COURBET", "DIDEROT", "")
		|| this.StringAt((m_current - 7), 8, "ENTREPOT", "CABERNET", "DUBONNET", "MASSENET", "MUSCADET", "RICOCHET", "ESCARGOT", "")
		|| this.StringAt((m_current - 8), 9, "SOBRIQUET", "CABRIOLET", "CASSOULET", "OUBRIQUET", "CAMEMBERT", ""))
		&& !this.StringAt((m_current + 1), 2, "AN", "RY", "IC", "OM", "IN", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-TU<N,L,A,O>-" in cases where it is pronounced
 * X ("sh", or in this case, "ch")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TUN_TUL_TUA_TUO = function()
{
	// e.g. "fortune", "fortunate"               
	if(this.StringAt((m_current - 3), 6, "FORTUN", "")
		// e.g. "capitulate"
		|| (this.StringAt(m_current, 3, "TUL", "")
			&& (this.IsVowel(m_current - 1) && this.IsVowel(m_current + 3)))
		// e.g. "obituary", "barbituate"
		||  this.StringAt((m_current - 2), 5, "BITUA", "BITUE", "")
		// e.g. "actual"
		|| ((m_current > 1) && this.StringAt(m_current, 3, "TUA", "TUO", "")))
	{
		this.MetaphAddWithAlt("X", "T");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-T<vowel>-" forms where 'T' is pronounced as X 
 * ("sh", or in this case "ch")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TUE_TEU_TEOU_TUL_TIE = function()
{
	// 'constituent', 'pasteur'
	if(this.StringAt((m_current + 1), 4, "UENT", "")
		|| this.StringAt((m_current - 4), 9, "RIGHTEOUS",  "")
		|| this.StringAt((m_current - 3), 7, "STATUTE",  "")
		|| this.StringAt((m_current - 3), 7, "AMATEUR",  "")
		// e.g. "blastula", "pasteur"
		|| (this.StringAt((m_current - 1), 5, "NTULE", "NTULA", "STULE", "STULA", "STEUR", ""))
		// e.g. "statue"
		|| (((m_current + 2) == m_last) && this.StringAt(m_current, 3, "TUE", ""))
		// e.g. "constituency"
		|| this.StringAt(m_current, 5, "TUENC", "")
		// e.g. "statutory"
		|| this.StringAt((m_current - 3), 8, "STATUTOR", "")
		// e.g. "patience"
		|| (((m_current + 5) == m_last) && this.StringAt(m_current, 6, "TIENCE", "")))
	{
		this.MetaphAddWithAlt("X", "T");
		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-TU-" forms in suffixes where it is usually
 * pronounced as X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TUR_TIU_Suffixes = function()
{
	// 'adventure', 'musculature'
	if((m_current > 0) && this.StringAt((m_current + 1), 3, "URE", "URA", "URI", "URY", "URO", "IUS", ""))
	{
		// exceptions e.g. 'tessitura', mostly from romance languages
		if ((this.StringAt((m_current + 1), 3, "URA", "URO", "") 
			//&& !this.StringAt((m_current + 1), 4, "URIA", "") 
			&& ((m_current + 3) == m_last))
			&& !this.StringAt((m_current - 3), 7, "VENTURA", "")
			// e.g. "kachaturian", "hematuria"
			|| this.StringAt((m_current + 1), 4, "URIA", ""))
		{
			this.MetaphAdd("T");
		}
		else
		{
			this.MetaphAddWithAlt("X", "T");
		}

		this.AdvanceCounter(2, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-TI<O,A,U>-" as X ("sh"), except
 * in cases where it is part of a combining form,
 * or as J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TI = function()
{
	// '-tio-', '-tia-', '-tiu-'
	// except combining forms where T already pronounced e.g 'rooseveltian'
	if((this.StringAt((m_current + 1), 2, "IO", "") && !this.StringAt((m_current - 1), 5, "ETIOL", ""))
		|| this.StringAt((m_current + 1), 3, "IAL", "")
		|| this.StringAt((m_current - 1), 5, "RTIUM", "ATIUM", "")
		|| ((this.StringAt((m_current + 1), 3, "IAN", "") && (m_current > 0))
				&& !(this.StringAt((m_current - 4), 8, "FAUSTIAN", "")
		|| this.StringAt((m_current - 5), 9, "PROUSTIAN", "")
		|| this.StringAt((m_current - 2), 7, "TATIANA", "")
		||(this.StringAt((m_current - 3), 7, "KANTIAN", "GENTIAN", "")
		|| this.StringAt((m_current - 8), 12, "ROOSEVELTIAN", "")))
		|| (((m_current + 2) == m_last) 
				&& this.StringAt(m_current, 3, "TIA", "")
		// exceptions to above rules where the pronounciation is usually X
		&& !(this.StringAt((m_current - 3), 6, "HESTIA", "MASTIA", "")
			|| this.StringAt((m_current - 2), 5, "OSTIA", "")
			|| this.StringAt(0, 3, "TIA", "")
			|| this.StringAt((m_current - 5), 8, "IZVESTIA", "")))
		|| this.StringAt((m_current + 1), 4, "IATE", "IATI", "IABL", "IATO", "IARY", "")
		|| this.StringAt((m_current - 5), 9, "CHRISTIAN", "")))
	{
		if(((m_current == 2) && this.StringAt(0, 4, "ANTI", ""))
			|| this.StringAt(0, 5, "PATIO", "PITIA", "DUTIA", ""))
		{
			this.MetaphAdd("T");
		}
		else if(this.StringAt((m_current - 4), 8, "EQUATION", ""))
		{
			this.MetaphAdd("J");
		}
		else
		{
			if(this.StringAt(m_current, 4, "TION", ""))
			{
				this.MetaphAdd("X");
			}
			else if(this.StringAt(0, 5, "KATIA", "LATIA", ""))
			{
				this.MetaphAddWithAlt("T", "X");
			}
			else
			{
				this.MetaphAddWithAlt("X", "T");
			}
		}

		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-TIENT-" where "TI" is pronounced X ("sh")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TIENT = function()
{
	// e.g. 'patient'
	if(this.StringAt((m_current + 1), 4, "IENT", ""))
	{
		this.MetaphAddWithAlt("X", "T");
		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode "-TSCH-" as X ("ch")
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TSCH = function()
{
	//'deutsch'
	if(this.StringAt(m_current, 4, "TSCH", "")
		// combining forms in german where the 'T' is pronounced seperately
		&& !this.StringAt((m_current - 3), 4, "WELT", "KLAT", "FEST", ""))
	{
		// pronounced the same as "ch" in "chit" => X
		this.MetaphAdd("X");
		m_current += 4;
		return true;
	}

	return false;
}

/**
 * Encode "-TZSCH-" as X ("ch")
 * 
 * "Neitzsche is peachy"
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TZSCH = function()
{
	//'neitzsche'
	if(this.StringAt(m_current, 5, "TZSCH", ""))
	{
		this.MetaphAdd("X");
		m_current += 5;
		return true;
	}

	return false;
}

/**
 * Encodes cases where the 'H' in "-TH-" is the beginning of
 * another word in a combining form, special cases where it is
 * usually pronounced as 'T', and a special case where it has
 * become pronounced as X ("sh", in this case "ch")
 *
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TH_Pronounced_Separately = function()
{
	//'adulthood', 'bithead', 'apartheid'
	if(((m_current > 0) 
			&& this.StringAt((m_current + 1), 4, "HOOD", "HEAD", "HEID", "HAND", "HILL", "HOLD", 
											"HAWK", "HEAP", "HERD", "HOLE", "HOOK", "HUNT",   
											"HUMO", "HAUS", "HOFF", "HARD", "HIDE", "")
			&& !this.StringAt((m_current - 3), 5, "SOUTH", "NORTH", ""))
		|| this.StringAt((m_current + 1), 5, "HOUSE", "HEART", "HASTE", "HYPNO", "HEQUE", "HOUND", "")
        || ((m_current > 0) && this.StringAt((m_current + 1), 6, "HAMMER", ""))
		// watch out for greek root "-thallic"
		|| (this.StringAt((m_current + 1), 4, "HALL", "") 
			&& ((m_current + 4) == m_last)
			&& !this.StringAt((m_current - 3), 5, "SOUTH", "NORTH", "")) 
		|| (this.StringAt((m_current + 1), 3, "HAM", "") 
				&& ((m_current + 3) == m_last) 
				&& !(this.StringAt(0, 6, "GOTHAM", "WITHAM", "LATHAM", "")
					 || this.StringAt(0, 7, "BENTHAM", "WALTHAM", "WORTHAM", "")
					 || this.StringAt(0, 8, "GRANTHAM", "")))
		|| (this.StringAt((m_current + 1), 5, "HATCH", "")
		&& !((m_current == 0) || this.StringAt((m_current - 2), 8, "UNTHATCH", "")))
		|| this.StringAt((m_current - 3), 7, "WARTHOG", "")
		// and some special cases where "-TH-" is usually pronounced 'T'
		|| this.StringAt((m_current - 2), 6, "ESTHER", "")
		|| this.StringAt((m_current - 3), 6, "GOETHE", "")
		|| this.StringAt((m_current - 2), 8, "NATHALIE", ""))
	{
		// special case
		if (this.StringAt((m_current - 3), 7, "POSTHUM", ""))
		{
			this.MetaphAdd("X");
		}
		else
		{
			this.MetaphAdd("T");
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode the "-TTH-" in "matthew", eating the redundant 'T'
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TTH = function()
{
	// 'matthew' vs. 'outthink'
	if(this.StringAt(m_current, 3, "TTH", ""))
	{
		if (this.StringAt((m_current - 2), 5, "MATTH", ""))
		{
			this.MetaphAdd("0");
		}
		else
		{
			this.MetaphAdd("T0");
		}
		m_current += 3;
		return true;
	}

	return false;
}

/**
 * Encode "-TH-". 0 (zero) is used in Metaphone to encode this sound
 * when it is pronounced as a dipthong, either voiced or unvoiced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_TH = function()
{
	if(this.StringAt(m_current, 2, "TH", "") )
	{
		//'-clothes-'
		if(this.StringAt((m_current - 3), 7, "CLOTHES", ""))
		{
			// vowel already encoded so skip right to S
			m_current += 3;
			return true;
		}

		//special case "thomas", "thames", "beethoven" or germanic words
		if(this.StringAt((m_current + 2), 4, "OMAS", "OMPS", "OMPK", "OMSO", "OMSE", 
										"AMES", "OVEN", "OFEN", "ILDA", "ILDE", "") 
			|| (this.StringAt(0, 4, "THOM", "")  && (m_length == 4))
			|| (this.StringAt(0, 5, "THOMS", "")  && (m_length == 5))
			|| this.StringAt(0, 4, "VAN ", "VON ", "") 
			|| this.StringAt(0, 3, "SCH", ""))
		{
			this.MetaphAdd("T");

		}
		else
		{
			// give an 'etymological' 2nd
			// encoding for "smith"
			if(this.StringAt(0, 2, "SM", ""))
			{
				this.MetaphAddWithAlt("0", "T");
			}
			else
			{
				this.MetaphAdd("0");
			}
		}

		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-V-"
 * 
 */
Metaphone3.prototype.Encode_V = function()
{
	// eat redundant 'V'
	if(this.GetCharAt(m_current + 1) == 'V')
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}

	this.MetaphAddExactApprox("V", "F");
}

/**
 * Encode "-W-"
 * 
 */
Metaphone3.prototype.Encode_W = function()
{
	if(this.Encode_Silent_W_At_Beginning()
		|| this.Encode_WITZ_WICZ()
		|| this.Encode_WR()
		|| this.Encode_Initial_W_Vowel()
		|| this.Encode_WH()
		|| this.Encode_Eastern_European_W())
	{
		return;
	}

	// e.g. 'zimbabwe'
	if(m_encodeVowels
		&& this.StringAt(m_current, 2, "WE", "")
		&& ((m_current + 1) == m_last))
	{
		this.MetaphAdd("A");
	}
	
	//else skip it
	m_current++;

}

/**
 * Encode cases where 'W' is silent at beginning of word
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Silent_W_At_Beginning = function()
{    
	//skip these when at start of word
    if((m_current == 0)
		&& this.StringAt(m_current, 2, "WR", ""))
	{
        m_current += 1;
		return true;
	}

	return false;
}

/**
 * Encode polish patronymic suffix, mapping
 * alternate spellings to the same encoding,
 * and including easern european pronounciation
 * to the american so that both forms can
 * be found in a genealogy search
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_WITZ_WICZ = function()
{
	//polish e.g. 'filipowicz'
	if(((m_current + 3) == m_last) && this.StringAt(m_current, 4, "WICZ", "WITZ", ""))
	{
		if(m_encodeVowels)
		{
			if((m_primary.length > 0)
					&& m_primary.charAt(m_primary.length - 1) == 'A')
			{
				this.MetaphAddWithAlt("TS", "FAX");
			}
			else
			{
				this.MetaphAddWithAlt("ATS", "FAX");					
			}
		}
		else
		{
			this.MetaphAddWithAlt("TS", "FX");
		}
		m_current += 4;
		return true;
	}

	return false;
}

/**
 * Encode "-WR-" as R ('W' always effectively silent)
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_WR = function()
{
	//can also be in middle of word
	if(this.StringAt(m_current, 2, "WR", ""))
	{
		this.MetaphAdd("R");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "W-", adding central and eastern european
 * pronounciations so that both forms can be found
 * in a genealogy search
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_W_Vowel = function()
{
	if((m_current == 0) && this.IsVowel(m_current + 1))
	{
		//Witter should match Vitter
		if(this.Germanic_Or_Slavic_Name_Beginning_With_W())
		{
			if(m_encodeVowels)
			{
				this.MetaphAddExactApprox4("A", "VA", "A", "FA");
			}
			else
			{
				this.MetaphAddExactApprox4("A", "V", "A", "F");
			}
		}
		else
		{
			this.MetaphAdd("A");
		}

		m_current++;
		// don't encode vowels twice
		m_current = this.SkipVowels(m_current);
		return true;
	}

	return false;
}

/**
 * Encode "-WH-" either as H, or close enough to 'U' to be
 * considered a vowel
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_WH = function()
{
	if(this.StringAt(m_current, 2, "WH", ""))
	{
		// cases where it is pronounced as H
		// e.g. 'who', 'whole'
		if((this.GetCharAt(m_current + 2) == 'O')
			// exclude cases where it is pronounced like a vowel
			&& !(this.StringAt((m_current + 2), 4, "OOSH", "")
			|| this.StringAt((m_current + 2), 3, "OOP", "OMP", "ORL", "ORT", "")
			|| this.StringAt((m_current + 2), 2, "OA", "OP", "")))
		{
			this.MetaphAdd("H");
			this.AdvanceCounter(3, 2);
			return true;
		}
		else
		{
			// combining forms, e.g. 'hollowhearted', 'rawhide'
			if(this.StringAt((m_current + 2), 3, "IDE", "ARD", "EAD", "AWK", "ERD", 
											"OOK", "AND", "OLE", "OOD", "")
				|| this.StringAt((m_current + 2), 4, "EART", "OUSE", "OUND", "")
				|| this.StringAt((m_current + 2), 5, "AMMER", ""))
			{
				this.MetaphAdd("H");
				m_current += 2;
				return true;
			}
			else if(m_current == 0)
			{
				this.MetaphAdd("A");
				m_current += 2;
				// don't encode vowels twice
				m_current = this.SkipVowels(m_current);
				return true;
			}
		}
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode "-W-" when in eastern european names, adding
 * the eastern european pronounciation to the american so
 * that both forms can be found in a genealogy search
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Eastern_European_W = function()
{
	if(this.Eastern_European_Name_Ending(m_current)
		|| this.StringAt(0, 3, "SCH", ""))
	{			
		this.MetaphAddExactApprox4("", "V", "", "F");
		m_current++;
		return true;
	}

	return false;
}

/** 
 * 'W' in these contexts needs special handling
 * 
 * @param current
 * @return
 */
Metaphone3.prototype.Eastern_European_Name_Ending = function(current)
{
	//Arnow should match Arnoff
	if(((this.GetCharAt(current) == 'W') 
				&& this.IsVowel(current - 1) 
				&& (current == m_last) 
				&& (m_length > 3) 
				&& !this.English_Word_Ending_In_OW(current)) 
		|| this.StringAt((current - 1), 5, "EWSKI", "EWSKY", "OWSKI", "OWSKY", "OWNIA", "")
		|| (this.StringAt((current - 1), 4, "OWNI", "OWNY", "") && ((current + 2) == m_last))
		|| (this.StringAt(current, 5, "WICKI", "WACKI", "") && ((current + 4) == m_last))
		|| this.StringAt(current, 4, "WIAK", "WICZ", "WITZ", "") && ((current + 3) == m_last))
	{
		return true;
	}
	
	return false;
}

/**
 * Exclude these from 2nd encoding designed to catch alt spelling of eastern european names
 * 
 * @param current
 * @return
 */
Metaphone3.prototype.English_Word_Ending_In_OW = function(current)
{
	if(this.StringAt((current - 3), 4, "BROW", "AVOW", "BLOW", "CHOW", "CROW", "DHOW", "FLOW", "GLOW", 
			"GROW", "KNOW", "MEOW", "PLOW", "PROW", "SCOW", "SHOW", "SLOW", "SNOW", "STOW", "TROW", "")
			|| this.StringAt((current - 4), 5, "ALLOW", "ARROW", "BELOW", "ELBOW", "ENDOW", "THROW", "MIAOW", "")
			|| this.StringAt((current - 5), 6, "BARLOW", "BARROW", "BELLOW", "BESTOW", "BILLOW", "BORROW", 
					"BOWWOW", "BURROW", "CALLOW", "ERENOW", "ESCROW", "FALLOW", "FARROW", "FELLOW", 
					"FOLLOW", "FURROW", "HALLOW", "HARROW", "HAYMOW", "HOLLOW", "KOWTOW", "MALLOW", 
					"MARROW", "MEADOW", "MELLOW", "MINNOW", "MORROW", "NARROW", "PILLOW", "POWWOW", 
					"SHADOW", "SALLOW", "SORROW", "TALLOW", "WALLOW", "WILLOW", "WINDOW", "WINNOW", "YARROW", "YELLOW", "")
			|| this.StringAt((current - 6), 7, "SHALLOW", "HOOSGOW", "LONGBOW", "SOMEHOW", "SPARROW", "SWALLOW", "WHITLOW", "WINDROW", "")
			|| this.StringAt((current - 7), 8, "BUNGALOW", "CARASSOW", "CROSSBOW", "FURBELOW", "HEDGEROW", "HOOSEGOW", "LOBBYGOW", "CROSSBOW", ""))
		{
			return true;
		}
	
	return false;
}

/**
 * Encode "-X-"
 * 
 */
Metaphone3.prototype.Encode_X = function()
{
	if(this.Encode_Initial_X()
		|| this.Encode_Greek_X()
		|| this.Encode_X_Special_Cases()
		|| this.Encode_X_To_H()
		|| this.Encode_X_Vowel()
		|| this.Encode_French_X_Final())
	{
		return;
	}

	// eat redundant 'X' or other redundant cases
	if(this.StringAt((m_current + 1), 1, "X", "Z", "S", "")
		// e.g. "excite", "exceed"
		|| this.StringAt((m_current + 1), 2, "CI", "CE", ""))
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encode initial X where it is usually pronounced as S
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Initial_X = function()
{		
	// current chinese pinyin spelling
	if(this.StringAt(0, 3, "XIA", "XIO", "XIE", "")
		|| this.StringAt(0, 2, "XU", ""))
	{
		this.MetaphAdd("X");
		m_current++;
		return true;
	}
	
	// else
	if((m_current == 0))
	{
		this.MetaphAdd("S");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode X when from greek roots where it is usually pronounced as S
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_Greek_X = function()
{
	// 'xylophone', xylem', 'xanthoma', 'xeno-'
	if(this.StringAt((m_current + 1), 3, "YLO", "YLE", "ENO", "")
		|| this.StringAt((m_current + 1), 4, "ANTH", ""))
	{
		this.MetaphAdd("S");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode special cases, "LUXUR-", "Texeira"
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_X_Special_Cases = function()
{
	// 'luxury'
	if(this.StringAt((m_current - 2), 5, "LUXUR", ""))
	{
		this.MetaphAddExactApprox("GJ", "KJ");
		m_current++;
		return true;
	}
	
	// 'texeira' portuguese/galician name
	if(this.StringAt(0, 7, "TEXEIRA", "")
		|| this.StringAt(0, 8, "TEIXEIRA", ""))
	{
		this.MetaphAdd("X");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode special case where americans know the
 * proper mexican indian pronounciation of this name
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_X_To_H = function()
{
	// TODO: look for other mexican indian words
	// where 'X' is usually pronounced this way
	if(this.StringAt((m_current - 2), 6, "OAXACA", "")
		|| this.StringAt((m_current - 3), 7, "QUIXOTE", ""))
	{
		this.MetaphAdd("H");
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-X-" in vowel contexts where it is usually 
 * pronounced KX ("ksh")
 * account also for BBC pronounciation of => KS
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_X_Vowel = function()
{
	// e.g. "sexual", "connexion" (british), "noxious"
	if(this.StringAt((m_current + 1), 3, "UAL", "ION", "IOU", ""))
	{
		this.MetaphAddWithAlt("KX", "KS");
		this.AdvanceCounter(3, 1);
		return true;
	}

	return false;
}

/**
 * Encode cases of "-X", encoding as silent when part
 * of a french word where it is not pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_French_X_Final = function()
{
	//french e.g. "breaux", "paix"
	if(!((m_current == m_last) 
		&& (this.StringAt((m_current - 3), 3, "IAU", "EAU", "IEU", "") 
		|| this.StringAt((m_current - 2), 2, "AI", "AU", "OU", "OI", "EU", ""))) )
	{
		this.MetaphAdd("KS");
	}

	return false;
}

/**
 * Encode "-Z-"
 * 
 */
Metaphone3.prototype.Encode_Z = function()
{
	if(this.Encode_ZZ()
		|| this.Encode_ZU_ZIER_ZS()
		|| this.Encode_French_EZ()
		|| this.Encode_German_Z())
	{
		return;
	}

	if(this.Encode_ZH())
	{
		return;
	}
	else
	{
		this.MetaphAdd("S");
	}

	// eat redundant 'Z'
	if(this.GetCharAt(m_current + 1) == 'Z')
	{
		m_current += 2;
	}
	else
	{
		m_current++;
	}
}

/**
 * Encode cases of "-ZZ-" where it is obviously part
 * of an italian word where "-ZZ-" is pronounced as TS
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ZZ = function()
{
	// "abruzzi", 'pizza' 
	if((this.GetCharAt(m_current + 1) == 'Z') 
		&& ((this.StringAt((m_current + 2), 1, "I", "O", "A", "") 
		&& ((m_current + 2) == m_last))
		|| this.StringAt((m_current - 2), 9, "MOZZARELL", "PIZZICATO", "PUZZONLAN", "")))
	{
		this.MetaphAddWithAlt("TS", "S");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Encode special cases where "-Z-" is pronounced as J
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ZU_ZIER_ZS = function()
{
	if(((m_current == 1) && this.StringAt((m_current - 1), 4, "AZUR", "")) 
		|| (this.StringAt(m_current, 4, "ZIER", "") 
				&& !this.StringAt((m_current - 2), 6, "VIZIER", ""))
		|| this.StringAt(m_current, 3, "ZSA", ""))
	{
		this.MetaphAddWithAlt("J", "S");
		
		if(this.StringAt(m_current, 3, "ZSA", ""))
		{
			m_current += 2;
		}
		else
		{
			m_current++;
		}
		return true;
	}

	return false;
}

/**
 * Encode cases where americans recognize "-EZ" as part
 * of a french word where Z not pronounced
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_French_EZ = function()
{
	if(((m_current == 3) && this.StringAt((m_current - 3), 4, "CHEZ", ""))
		|| this.StringAt((m_current - 5), 6, "RENDEZ", ""))
	{
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode cases where "-Z-" is in a german word
 * where Z => TS in german
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_German_Z = function()
{
	if(((m_current == 2) && ((m_current + 1) == m_last) && this.StringAt((m_current - 2), 4, "NAZI", ""))
		|| this.StringAt((m_current - 2), 6, "NAZIFY", "MOZART", "")
		|| this.StringAt((m_current - 3), 4, "HOLZ", "HERZ", "MERZ", "FITZ", "")
		|| (this.StringAt((m_current - 3), 4, "GANZ", "") && !this.IsVowel(m_current + 1))
		|| this.StringAt((m_current - 4), 5, "STOLZ", "PRINZ", "")
		|| this.StringAt((m_current - 4), 7, "VENEZIA", "")
		|| this.StringAt((m_current - 3), 6, "HERZOG", "")
		// german words beginning with "sch-" but not schlimazel, schmooze
		|| ((m_inWord.indexOf("SCH") > -1) && !(this.StringAt((m_last - 2), 3, "IZE", "OZE", "ZEL", "")))
		|| ((m_current > 0) && this.StringAt(m_current, 4, "ZEIT", ""))
		|| this.StringAt((m_current - 3), 4, "WEIZ", ""))
	{
		if((m_current > 0) && m_inWord.charAt(m_current - 1) == 'T')
		{
			this.MetaphAdd("S");
		}
		else
		{
			this.MetaphAdd("TS");
		}
		m_current++;
		return true;
	}

	return false;
}

/**
 * Encode "-ZH-" as J 
 * 
 * @return true if encoding handled in this routine, false if not
 * 
 */
Metaphone3.prototype.Encode_ZH = function()
{
	//chinese pinyin e.g. 'zhao', also english "phonetic spelling"
	if(this.GetCharAt(m_current + 1) == 'H')
	{
		this.MetaphAdd("J");
		m_current += 2;
		return true;
	}

	return false;
}

/**
 * Test for names derived from the swedish,
 * dutch, or slavic that should get an alternate
 * pronunciation of 'SV' to match the native
 * version
 * 
 * @return true if swedish, dutch, or slavic derived name
 */
Metaphone3.prototype.Names_Beginning_With_SW_That_Get_Alt_SV = function()
{
	if(this.StringAt(0, 7, "SWANSON", "SWENSON", "SWINSON", "SWENSEN", 
					  "SWOBODA", "")
		|| this.StringAt(0, 9, "SWIDERSKI", "SWARTHOUT", "")
		|| this.StringAt(0, 10, "SWEARENGIN", ""))
	{
		return true;
	}

	return false;
}

/**
 * Test for names derived from the german
 * that should get an alternate pronunciation
 * of 'XV' to match the german version spelled
 * "schw-"
 * 
 * @return true if german derived name
 */
Metaphone3.prototype.Names_Beginning_With_SW_That_Get_Alt_XV = function()
{
	if(this.StringAt(0, 5, "SWART", "")
		|| this.StringAt(0, 6, "SWARTZ", "SWARTS", "SWIGER", "")
		|| this.StringAt(0, 7, "SWITZER", "SWANGER", "SWIGERT", 
					      "SWIGART", "SWIHART", "")
		|| this.StringAt(0, 8, "SWEITZER", "SWATZELL", "SWINDLER", "")
		|| this.StringAt(0, 9, "SWINEHART", "")
		|| this.StringAt(0, 10, "SWEARINGEN", ""))
	{
		return true;
	}

	return false;
}

/**
 * Test whether the word in question
 * is a name of germanic or slavic origin, for
 * the purpose of determining whether to add an
 * alternate encoding of 'V' 
 * 
 * @return true if germanic or slavic name
 */
Metaphone3.prototype.Germanic_Or_Slavic_Name_Beginning_With_W = function()
{
	if(this.StringAt(0, 3, "WEE", "WIX", "WAX", "")
		|| this.StringAt(0, 4, "WOLF", "WEIS", "WAHL", "WALZ", "WEIL", "WERT", 
						  "WINE", "WILK", "WALT", "WOLL", "WADA", "WULF", 
						  "WEHR", "WURM", "WYSE", "WENZ", "WIRT", "WOLK", 
						  "WEIN", "WYSS", "WASS", "WANN", "WINT", "WINK", 
						  "WILE", "WIKE", "WIER", "WELK", "WISE", "")
		|| this.StringAt(0, 5, "WIRTH", "WIESE", "WITTE", "WENTZ", "WOLFF", "WENDT", 
						  "WERTZ", "WILKE", "WALTZ", "WEISE", "WOOLF", "WERTH", 
						  "WEESE", "WURTH", "WINES", "WARGO", "WIMER", "WISER", 
						  "WAGER", "WILLE", "WILDS", "WAGAR", "WERTS", "WITTY", 
						  "WIENS", "WIEBE", "WIRTZ", "WYMER", "WULFF", "WIBLE", 
						  "WINER", "WIEST", "WALKO", "WALLA", "WEBRE", "WEYER", 
						  "WYBLE", "WOMAC", "WILTZ", "WURST", "WOLAK", "WELKE", 
						  "WEDEL", "WEIST", "WYGAN", "WUEST", "WEISZ", "WALCK", 
						  "WEITZ", "WYDRA", "WANDA", "WILMA", "WEBER", "")
		|| this.StringAt(0, 6, "WETZEL", "WEINER", "WENZEL", "WESTER", "WALLEN", "WENGER", 
						  "WALLIN", "WEILER", "WIMMER", "WEIMER", "WYRICK", "WEGNER", 
						  "WINNER", "WESSEL", "WILKIE", "WEIGEL", "WOJCIK", "WENDEL", 
						  "WITTER", "WIENER", "WEISER", "WEXLER", "WACKER", "WISNER", 
						  "WITMER", "WINKLE", "WELTER", "WIDMER", "WITTEN", "WINDLE", 
						  "WASHER", "WOLTER", "WILKEY", "WIDNER", "WARMAN", "WEYANT", 
						  "WEIBEL", "WANNER", "WILKEN", "WILTSE", "WARNKE", "WALSER", 
						  "WEIKEL", "WESNER", "WITZEL", "WROBEL", "WAGNON", "WINANS", 
						  "WENNER", "WOLKEN", "WILNER", "WYSONG", "WYCOFF", "WUNDER", 
						  "WINKEL", "WIDMAN", "WELSCH", "WEHNER", "WEIGLE", "WETTER", 
						  "WUNSCH", "WHITTY", "WAXMAN", "WILKER", "WILHAM", "WITTIG", 
						  "WITMAN", "WESTRA", "WEHRLE", "WASSER", "WILLER", "WEGMAN", 
						  "WARFEL", "WYNTER", "WERNER", "WAGNER", "WISSER", "")
		|| this.StringAt(0, 7, "WISEMAN", "WINKLER", "WILHELM", "WELLMAN", "WAMPLER", "WACHTER", 
						  "WALTHER", "WYCKOFF", "WEIDNER", "WOZNIAK", "WEILAND", "WILFONG", 
						  "WIEGAND", "WILCHER", "WIELAND", "WILDMAN", "WALDMAN", "WORTMAN", 
						  "WYSOCKI", "WEIDMAN", "WITTMAN", "WIDENER", "WOLFSON", "WENDELL", 
						  "WEITZEL", "WILLMAN", "WALDRUP", "WALTMAN", "WALCZAK", "WEIGAND", 
						  "WESSELS", "WIDEMAN", "WOLTERS", "WIREMAN", "WILHOIT", "WEGENER", 
						  "WOTRING", "WINGERT", "WIESNER", "WAYMIRE", "WHETZEL", "WENTZEL", 
						  "WINEGAR", "WESTMAN", "WYNKOOP", "WALLICK", "WURSTER", "WINBUSH", 
						  "WILBERT", "WALLACH", "WYNKOOP", "WALLICK", "WURSTER", "WINBUSH", 
						  "WILBERT", "WALLACH", "WEISSER", "WEISNER", "WINDERS", "WILLMON", 
						  "WILLEMS", "WIERSMA", "WACHTEL", "WARNICK", "WEIDLER", "WALTRIP", 
						  "WHETSEL", "WHELESS", "WELCHER", "WALBORN", "WILLSEY", "WEINMAN", 
						  "WAGAMAN", "WOMMACK", "WINGLER", "WINKLES", "WIEDMAN", "WHITNER", 
						  "WOLFRAM", "WARLICK", "WEEDMAN", "WHISMAN", "WINLAND", "WEESNER", 
						  "WARTHEN", "WETZLER", "WENDLER", "WALLNER", "WOLBERT", "WITTMER", 
						  "WISHART", "WILLIAM", "")
		|| this.StringAt(0, 8, "WESTPHAL", "WICKLUND", "WEISSMAN", "WESTLUND", "WOLFGANG", "WILLHITE", 
						  "WEISBERG", "WALRAVEN", "WOLFGRAM", "WILHOITE", "WECHSLER", "WENDLING", 
						  "WESTBERG", "WENDLAND", "WININGER", "WHISNANT", "WESTRICK", "WESTLING", 
						  "WESTBURY", "WEITZMAN", "WEHMEYER", "WEINMANN", "WISNESKI", "WHELCHEL", 
						  "WEISHAAR", "WAGGENER", "WALDROUP", "WESTHOFF", "WIEDEMAN", "WASINGER", 
						  "WINBORNE", "")
		|| this.StringAt(0, 9, "WHISENANT", "WEINSTEIN", "WESTERMAN", "WASSERMAN", "WITKOWSKI", "WEINTRAUB", 
					      "WINKELMAN", "WINKFIELD", "WANAMAKER", "WIECZOREK", "WIECHMANN", "WOJTOWICZ", 
					      "WALKOWIAK", "WEINSTOCK", "WILLEFORD", "WARKENTIN", "WEISINGER", "WINKLEMAN",  
					      "WILHEMINA", "")
		|| this.StringAt(0, 10, "WISNIEWSKI", "WUNDERLICH", "WHISENHUNT", "WEINBERGER", "WROBLEWSKI", 
						   "WAGUESPACK", "WEISGERBER", "WESTERVELT", "WESTERLUND", "WASILEWSKI", 
						   "WILDERMUTH", "WESTENDORF", "WESOLOWSKI", "WEINGARTEN", "WINEBARGER", 
						   "WESTERBERG", "WANNAMAKER", "WEISSINGER", "")
		|| this.StringAt(0, 11, "WALDSCHMIDT", "WEINGARTNER", "WINEBRENNER", "")
		|| this.StringAt(0, 12, "WOLFENBARGER", "")
		|| this.StringAt(0, 13, "WOJCIECHOWSKI", ""))
	{
		return true;
	}
	
	return false;		
}

/**
 * Test whether the word in question
 * is a name starting with 'J' that should
 * match names starting with a 'Y' sound.
 * All forms of 'John', 'Jane', etc, get
 * and alt to match e.g. 'Ian', 'Yana'. Joelle
 * should match 'Yael', 'Joseph' should match
 * 'Yusef'. German and slavic last names are
 * also included.
 * 
 * @return true if name starting with 'J' that
 * should get an alternate encoding as a vowel
 */
Metaphone3.prototype.Names_Beginning_With_J_That_Get_Alt_Y = function()
{
	if(this.StringAt(0, 3, "JAN", "JON", "JAN", "JIN", "JEN", "")
		|| this.StringAt(0, 4, "JUHL", "JULY", "JOEL", "JOHN", "JOSH", 
						  "JUDE", "JUNE", "JONI", "JULI", "JENA", 
						  "JUNG", "JINA", "JANA", "JENI", "JOEL", 
						  "JANN", "JONA", "JENE", "JULE", "JANI", 
						  "JONG", "JOHN", "JEAN", "JUNG", "JONE", 
						  "JARA", "JUST", "JOST", "JAHN", "JACO", 
						  "JANG", "JUDE", "JONE", "") 
		|| this.StringAt(0, 5, "JOANN", "JANEY", "JANAE", "JOANA", "JUTTA", 
						  "JULEE", "JANAY", "JANEE", "JETTA", "JOHNA", 
						  "JOANE", "JAYNA", "JANES", "JONAS", "JONIE", 
						  "JUSTA", "JUNIE", "JUNKO", "JENAE", "JULIO", 
						  "JINNY", "JOHNS", "JACOB", "JETER", "JAFFE", 
						  "JESKE", "JANKE", "JAGER", "JANIK", "JANDA", 
						  "JOSHI", "JULES", "JANTZ", "JEANS", "JUDAH", 
						  "JANUS", "JENNY", "JENEE", "JONAH", "JONAS", 
						  "JAKOB", "JOSUE", "JOSEF", "JULES", "JULIE", 
						  "JULIA", "JANIE", "JANIS", "JENNA", "JANNA", 
						  "JEANA", "JENNI", "JEANE", "JONNA", "")
		|| this.StringAt(0, 6, "JORDAN", "JORDON", "JOSEPH", "JOSHUA", "JOSIAH", 
						  "JOSPEH", "JUDSON", "JULIAN", "JULIUS", "JUNIOR", 
						  "JUDITH", "JOESPH", "JOHNIE", "JOANNE", "JEANNE", 
						  "JOANNA", "JOSEFA", "JULIET", "JANNIE", "JANELL", 
						  "JASMIN", "JANINE", "JOHNNY", "JEANIE", "JEANNA", 
						  "JOHNNA", "JOELLE", "JOVITA", "JOSEPH", "JONNIE", 
						  "JANEEN", "JANINA", "JOANIE", "JAZMIN", "JOHNIE", 
						  "JANENE", "JOHNNY", "JONELL", "JENELL", "JANETT", 
						  "JANETH", "JENINE", "JOELLA", "JOEANN", "JULIAN", 
						  "JOHANA", "JENICE", "JANNET", "JANISE", "JULENE", 
						  "JOSHUA", "JANEAN", "JAIMEE", "JOETTE", "JANYCE", 
						  "JENEVA", "JORDAN", "JACOBS", "JENSEN", "JOSEPH", 
						  "JANSEN", "JORDON", "JULIAN", "JAEGER", "JACOBY", 
						  "JENSON", "JARMAN", "JOSLIN", "JESSEN", "JAHNKE", 
						  "JACOBO", "JULIEN", "JOSHUA", "JEPSON", "JULIUS", 
						  "JANSON", "JACOBI", "JUDSON", "JARBOE", "JOHSON", 
						  "JANZEN", "JETTON", "JUNKER", "JONSON", "JAROSZ", 
						  "JENNER", "JAGGER", "JASMIN", "JEPSEN", "JORDEN", 
						  "JANNEY", "JUHASZ", "JERGEN", "JAKOBS", "JACOBS", "")
		|| this.StringAt(0, 7, "JOHNSON", "JOHNNIE", "JASMINE", "JEANNIE", "JOHANNA", 
						  "JANELLE", "JANETTE", "JULIANA", "JUSTINA", "JOSETTE", 
						  "JOELLEN", "JENELLE", "JULIETA", "JULIANN", "JULISSA", 
						  "JENETTE", "JANETTA", "JOSELYN", "JONELLE", "JESENIA", 
						  "JANESSA", "JAZMINE", "JEANENE", "JOANNIE", "JADWIGA", 
						  "JOLANDA", "JULIANE", "JANUARY", "JEANICE", "JANELLA", 
						  "JEANETT", "JENNINE", "JOHANNE", "JOHNSIE", "JANIECE", 
						  "JOHNSON", "JENNELL", "JAMISON", "JANSSEN", "JOHNSEN", 
						  "JARDINE", "JAGGERS", "JURGENS", "JOURDAN", "JULIANO", 
						  "JOSEPHS", "JHONSON", "JOZWIAK", "JANICKI", "JELINEK", 
						  "JANSSON", "JOACHIM", "JANELLE", "JACOBUS", "JENNING", 
						  "JANTZEN", "JOHNNIE",  "")
		|| this.StringAt(0, 8, "JOSEFINA", "JEANNINE", "JULIANNE", "JULIANNA", "JONATHAN", 
						  "JONATHON", "JEANETTE", "JANNETTE", "JEANETTA", "JOHNETTA", 
						  "JENNEFER", "JULIENNE", "JOSPHINE", "JEANELLE", "JOHNETTE", 
						  "JULIEANN", "JOSEFINE", "JULIETTA", "JOHNSTON", "JACOBSON", 
						  "JACOBSEN", "JOHANSEN", "JOHANSON", "JAWORSKI", "JENNETTE", 
						  "JELLISON", "JOHANNES", "JASINSKI", "JUERGENS", "JARNAGIN", 
						  "JEREMIAH", "JEPPESEN", "JARNIGAN", "JANOUSEK", "")
		|| this.StringAt(0, 9, "JOHNATHAN", "JOHNATHON", "JORGENSEN", "JEANMARIE", "JOSEPHINA", 
					      "JEANNETTE", "JOSEPHINE", "JEANNETTA", "JORGENSON", "JANKOWSKI", 
					      "JOHNSTONE", "JABLONSKI", "JOSEPHSON", "JOHANNSEN", "JURGENSEN", 
					      "JIMMERSON", "JOHANSSON", "")
		|| this.StringAt(0, 10, "JAKUBOWSKI", ""))
		{
			return true;
		}

		return false;
}
	
	
	/**
	 * @param args
	 */
	/*public static void main(String[] args)
	{
		Metaphone3 encoder = new Metaphone3();

		// instantiate, say, some objects
		myWord;
		metaph;
		alternateMetaph;

		// while(you are not done encoding words)
		//
		// get the next word you want to encode from your input
		// and copy it to myWord
		
		// you might want to set the Metaphone3 object
		// to encode non-initial vowels and use the "exact" encoding setting
		// however, these settings default to false
		encoder.SetEncodeVowels(true);
		encoder.SetEncodeExact(true);

		// remember, you allocate the storage for the target string
		myWord = "sriracha";
		encoder.SetWord(myWord);
	      	
		// call on the Metaphone3 object to produce encodings of the target string
		encoder.Encode();

		// retrieve the phonetically encoded lookup keys
		metaph = encoder.GetMetaph();
		//alternateMetaph = encoder.GetAlternateMetaph();
		System.out.println(myWord + " : " + metaph);			
		
	}
}*/

