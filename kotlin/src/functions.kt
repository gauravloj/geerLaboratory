
fun main(){
    println(getFormal())
    noReturn()
    println(singleExpression())
    withParam("feature")
}

// This function takes no argument and returns string
fun getFormal(): String {
    return  "Hello Darkness"
}

// Unit indicates that this function will return nothing usefull
fun noReturn(): Unit {
    println("There are useless types in kotlin")
}

fun singleExpression() : String = "This function has only single statement"

fun withParam(value: String){
    // using '$' we can use variables to concatenate with strings
    println("Another useless $value")
}