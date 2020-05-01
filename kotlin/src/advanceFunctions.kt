fun filterStrings(list: List<String>, predicate: ((String) -> Boolean)?){
    list.forEach {
        // if predicate is not nullable then use 'if (predicate(it))'
        if (predicate?.invoke(it) == true){
            println(it)
        }
    }
}

// Function as variable type
val predicateType : (String) -> Boolean = {
    it.startsWith("h")
}

// function as return type
fun getPredicate(): (String) -> Boolean{
    return {it.startsWith("w")}
}

fun main() {
    var lst = listOf("Come","here","and","dance","with","death")

    println("Starts with A")
    filterStrings(lst, { it.startsWith("a")})

    // if last parameter is a function, then it can be defined as a function body
    println("Starts with D")
    filterStrings(lst) { it.startsWith("d")}

    // function as a variable type
    println("Starts with H")
    filterStrings(lst, predicateType)

    // function as return type
    println("Starts with W")
    filterStrings(lst, getPredicate())

    // function chaining
    var lsts = listOf("Come","here","and","dance","with","death", null)
    lsts
        .filterNotNull()
        .filter(predicateType)
        .forEach {
            println(it)
        }

}