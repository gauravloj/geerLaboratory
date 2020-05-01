/*
if there is no class definition, the curly braces can be removed
Eg. class Person

If there are no parameters in constructor, then constructor can be removed
Eg. class Person constructor() --> class Person
class Person constructor()  --> class Person()

*/

class Person(_fName: String, _lName:String) {
    val firstName: String = _fName
    val lastName: String = _lName
}

/*
Access modifiers :
1. public: Available for everyone
2. internal: Available within the module
3. protected: Available for class and subclasses
4. private: Available inside the class only

These modifiers can be used for class, variables and functions
 */

class PersonWithDefault(val firstName: String = "Default",val lastName:String = "Constructor") {
    var nickName: String? = null
        set(value) {
            field = value
            println("Setting nickname")
        }
        get() {
            println("Getting nickname")
            return  field
        }

    fun getNames(){
        val nName = nickName ?: "Not called"
        println("$firstName $lastName $nName")
    }
}

// Instead of creating another variable inside class
// Constructor variables can be used as class variables
class PersonWithoutAttr(val firstName: String,val lastName:String) {

    init {
        println("Init One")
    }

    constructor(): this("Secondary", "Constructor"){
        println("Inside secondary constructor")
    }

    init {
        println("Init Two")
    }
}