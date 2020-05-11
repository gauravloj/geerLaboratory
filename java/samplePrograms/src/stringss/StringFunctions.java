package stringss;

public class StringFunctions {

	public static void main(String[] args) {
		String s1 = "hello";
		String s2 = "hello";
		String s3 = "hemlo";
		String s4 = "flag";
		String s5 = "";
		String s6 = "   flag    ";
		String s7 = "CBHDSjsfk sdfjnkBHDF SDFLK";
		int value = 20;

		// String length
		System.out.println("string length is: " + s1.length());
		System.out.println("string length is: " + s2.length());

		// String compare
		System.out.println(s1.compareTo(s2)); // 0 because both are equal
		System.out.println(s1.compareTo(s3)); // -1 because "l" is only one time lower than "m"
		System.out.println(s1.compareTo(s4)); // 2 because "h" is 2 times greater than "f"

		// String Concatenation
		s1 = s1.concat("how are you");
		System.out.println(s1);

		// String isEmpty
		System.out.println(s5.isEmpty()); // true
		System.out.println(s2.isEmpty()); // false

		// String trim
		System.out.println(s6 + " how are you"); // without trim()
		System.out.println(s6.trim() + " how are you"); // with trim()

		// String letter case
		System.out.println(s7.toLowerCase());
		System.out.println(s7.toUpperCase());

		// String vlaueOf returns string representation of an object
		System.out.println(String.valueOf(value) + 20);

		// String replace
		System.out.println(s2.replace('l', 'g'));
		System.out.println(s7.replace("dfj", "-- DfJ --"));

		// String contains
		System.out.println(s7.contains("CBHD")); // returns true
		System.out.println(s7.contains("CHBD")); // returns false

		// String equal
		System.out.println(s1.equals(s2)); // returns true
		System.out.println(s1.equalsIgnoreCase(s3)); // returns false

		// String to char array
		char[] ch = s1.toCharArray();
		for (int i = 0; i < ch.length; i++) {
			System.out.print(ch[i]);
		}

		// String bytes
		byte[] b = s1.getBytes();
		for (int i = 0; i < b.length; i++) {
			System.out.println(b[i]);
		}

		// String endsWith
		System.out.println(s1.endsWith("lo")); // returns true
		System.out.println(s1.endsWith("ol")); // returns false

		// Substring
		System.out.println(s7.substring(10)); // With Begin Index 10 to end of String
		System.out.println(s7.substring(10, 14)); // From index 10 to 14

		// String split
		System.out.println("Split Example: ");
		for (String s : s7.split(" ")) {
			System.out.println(s);
		}

		// String split with multiple delimiter
		System.out.println("MultiSplit Example: ");
		String[] arrOfStr = "Aloha! let's welcome our new guest, friend : Aramis.".split("[, '.!:]+");
		for (int i = 0; i < arrOfStr.length; i++) {
			System.out.println("str[" + i + "] : " + arrOfStr[i]);
		}

		// String with limit parameter
		/**
		 * Syntax: public String[] split(String regex, int limit)
		 * 
		 * Parameter:
		 * 
		 * regex – a delimiting regular expression limit – the resulting threshold The
		 * limit can have 3 values, which are:
		 * 
		 * 1. limit > 0: If the limit is positive, then the pattern will be applied at most
		 * limit-1 times. The resulting array’s length will be no greater than n, and
		 * the array’s last entry will contain all input beyond the last matched
		 * delimiter. 
		 * 2. limit < 0: If the limit is negative, then the pattern will be
		 * applied as many times as possible and the resulting array can have any
		 * length. 
		 * 3. limit = 0: If the limit is equal to 0, the pattern will be applied as
		 * many times as possible, the resulting array can have any length but the
		 * trailing empty strings will be discarded. Return Value: an array of String
		 * objects computed by splitting the given string according to limit parameter
		 * 
		 * Exception: PatternSyntaxException, if the provided regular expression’s
		 * syntax is invalid
		 */
		String str = "468-567-7388";
		String[] arrOfStr1 = str.split("8", 2);
		System.out.println("Output when limit is +ve");
		System.out.println("Number of substrings: " + arrOfStr1.length);

		for (int i = 0; i < arrOfStr1.length; i++) {
			System.out.println("str[" + i + "] : " + arrOfStr1[i]);
		}

		String[] arrOfStr2 = str.split("8", -3);
		System.out.println("nOutput when limit is -ve");
		System.out.println("Number of substrings: " + arrOfStr2.length);

		for (int i = 0; i < arrOfStr2.length; i++) {
			System.out.println("str[" + i + "] : " + arrOfStr2[i]);
		}
		String[] arrOfStr3 = str.split("8", 0);
		System.out.println("nOutput when limit is 0");
		System.out.println("Number of substrings: " + arrOfStr3.length);

		for (int i = 0; i < arrOfStr3.length; i++) {
			System.out.println("str[" + i + "] : " + arrOfStr3[i]);
		}

	}

}
