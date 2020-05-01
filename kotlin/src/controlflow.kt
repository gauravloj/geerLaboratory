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
    checkNull(nullableVar)
    switchcase(nullableVar)
    conditionalAssignment(nullableVar)
}

fun checkNull(value: String?){
    println("If demo")
    if (value != null){
        println(value)
    } else {
        println("Val is null")
    }
}

fun switchcase(value: String?){
    println("Switch case demo")
    when(value){
        null -> println("Value is null")
        else -> println(value)
    }
}

fun conditionalAssignment(value: String?){
    //  var greet = if (value != null) value else "Value is null"

    // Elvis expression:
    var greet = value ?: "Value is null"
    var whengreet = when(value){
        null -> "Assigned null in when declaration"
        else -> value
    }
    println("Conditional assignment using if")
    println(greet)
    println("Conditional assignment using when")
    println(whengreet)
}