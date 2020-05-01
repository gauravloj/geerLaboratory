fun main() {
    //vararg example
    varargDemo("Hail", "Hitler", "Stalin", "Modi")

    // Spread operator : use '*' to explode list into individual items
    val arrys = arrayOf("Hitler", "Stalin", "Modi")
    varargDemo("Hail", *arrys)

    // named parameters.
    deathToALl(action = "Death", audience = "All")
    deathToALl(audience = "All", action = "Death")

    // Default parameters
    defaultToALl()
    defaultToALl(action = "Down")
    defaultToALl(audience = "Pappu")

    // If one parameter is named, all should be named
    varargDemo(value = "Hail", toDisplay =  *arrys)
    varargDemo( toDisplay =  *arrys, value = "Hail")
}


// vararg keyword allows a function to accept any number of arguments
fun varargDemo(value: String, vararg toDisplay: String){
    toDisplay.forEach { itm -> println(message = "$value $itm") }
}

// Named parameter
fun deathToALl(action: String, audience: String) {
    println("$action to $audience")
}

// Named parameter
fun defaultToALl(action: String = "Death", audience: String = "All") {
    println("$action to $audience")
}