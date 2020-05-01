var globalVar = "This is a global variable"

fun main() {
    val constName: String = "Value of this variable can\'t be changed";
    var generalName: String = "Value of this variable can be changed";

    //    with normal typedef, variable can't be null.
    // '?' is used to allow null values
    var nullableVar: String? = null

    var notype = "Type of this variable is implicitly inferred from it's value"


    println(message = globalVar)
    println(message = constName)
    println(message = generalName)
}