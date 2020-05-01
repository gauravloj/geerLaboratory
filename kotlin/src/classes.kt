fun main() {

    // Primary constructor with class variables
    val person = Person("First", "Name")
    println("${person.firstName} ${person.lastName}")

    // primary constructor without class variables
    val personwa = PersonWithoutAttr("First", "Name")
    println("${personwa.firstName} ${personwa.lastName}")

    // Secondary constructor
    val personsc = PersonWithoutAttr()
    println("${personsc.firstName} ${personsc.lastName}")

    // Secondary constructor
    val persondc = PersonWithDefault()
    //persondc.nickName = "Called"
    persondc.getNames()
}