
// with Private constructor, it's object cannot be created
class Entity private constructor(val id: String){

    /*
    A companion object can be called without a name
    Eg.
    companion object {
        fun create() = Entity("id")
    }

    If it is without name, it is called as Entity.create() or Entity.Companion.create()
    */

    // Companion obj are like any other class, they can implement another interfaces
    companion object Factory : PersonInfoProviderWithDef {
        fun create() = Entity("id")
        override val providerInfo: String
            get() = "Companion obj"
    }

}

fun main() {
    /*
    For classes with companion objects, syntax to use companion obj is :
        Entity.Companion.create()
    It can be shortened to     Entity.create()
     */
    val ent = Entity.Factory.create()
}