fun main() {
    //arrays()
    //lists()
    //mapus()

}

fun mapus(){
    println("Map demo : ")
    // mapOf will create immutable map.
    // To create mutable map use mutableMapOf
    val mps = mapOf(1 to "List",2 to "of",3 to "Strings",4 to "Where",5 to "Type",6 to "is",7 to  "Implicitly",8 to  "inferred")

    // mps.put(9, "type") // if mps is mutable then put function is used to add new item

    mps.forEach { (key, value) -> println("val of key $key is $value") }

}

fun lists(){
    println("List demo : ")
    // listOf will create immutable map.
    // To create mutable map use mutableListOf
    val lsts = listOf("List", "of", "Strings","Where","Type","is", "Implicitly", "inferred")
    // lsts.add(" type") // if lsts is mutable then add function is used to add new item
    // lsts.size gives the length of array
    // lsts[idx] returns the element at index idx. it is similar to lsts.get(idx)

    // Iterate using for
    for (str in lsts){
        print("$str ")
    }
    println("")
    // Iterate using foreach
    // 'it' is default parameter name for 'foreach' function
    lsts.forEach {
        print("$it ")
    }

    println("")
    // default parameter can be renamed
    lsts.forEach { str ->
        print("$str ")
    }

    println("")
    // Iterate using foreach with index
    lsts.forEachIndexed { index, str -> println("$str at $index") }
}

fun arrays(){

    println("Array demo : ")
    val arrys = arrayOf("Array", "of", "Strings","Where","Type","is", "Implicitly", "inferred")
    // arrys.size gives the length of array
    // arrys[idx] returns the element at index idx. it is similar to arrys.get(idx)
    // Iterate using for
    for (str in arrys){
        print("$str ")
    }
    println("")
    // Iterate using foreach
    // 'it' is default parameter name for 'foreach' function
    arrys.forEach {
        print("$it ")
    }

    println("")
    // default parameter can be renamed
    arrys.forEach { str ->
        print("$str ")
    }

    // Iterate using foreach with index
    arrys.forEachIndexed { index, str -> println("$str at $index") }
}