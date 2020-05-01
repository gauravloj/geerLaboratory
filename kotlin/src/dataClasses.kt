import java.util.*

enum class EntityType{
    HELP, EASY, MEDIUM, HARD;

    fun getFormattedName() = name.toLowerCase().capitalize()
}


object DataEntityFactory{
    fun create(type: EntityType) : DataEntity{
        val id = UUID.randomUUID().toString()
        val name = when(type){
            EntityType.HELP -> type.name
            EntityType.EASY -> type.getFormattedName()
            EntityType.MEDIUM -> "HARD"
            EntityType.HARD -> type.getFormattedName()
        }
        return when(type){
            EntityType.HELP -> DataEntity.Easy(id,name)
            EntityType.EASY -> DataEntity.Medium(id,name)
            EntityType.MEDIUM -> DataEntity.Hard(id,name, 22f)
            EntityType.HARD -> DataEntity.Help
        }
    }
}

sealed class DataEntity() {
    object Help: DataEntity() {
        val name = "Help"
    }

    // Data class provide immutable data types
    data class Easy(val id: String, val name: String): DataEntity()
    data class Medium(val id: String, val name: String): DataEntity()
    data class Hard(val id: String, val name: String, val weight: Float): DataEntity()
}


// Function extensions

fun DataEntity.Medium.print(){
    println("Extension of medium entity with id $id")
}

fun main() {

    // Data class provide immutable data types
    val entity1 = DataEntityFactory.create(EntityType.EASY)
    val entity2 = DataEntityFactory.create(EntityType.EASY)
    val entity3 = DataEntity.Easy("Govindam", "Adipurusham")
    val entity4 = DataEntity.Easy("Govindam", "Adipurusham")

    // entity4 and entity5 both are equal
    val entity5 = entity4.copy()

    // Named arguments can be used to change the value of parameter while copy
    val entity6 = entity4.copy(name = "Namah")

    val oneTwoEqual = if (entity1 == entity2) "are equal" else "are not equal"
    val threeFourEqual = if (entity3 == entity4) "are equal" else "are not equal"

    // using '===' operator, obj's addresses are compared instead of data
    val threeFourDeepEqual = if (entity3 === entity4) "are equal" else "are not equal"

    println("Entity1 and Entity2 $oneTwoEqual")
    println("Entity3 and Entity4 $threeFourEqual")
    println("Address of Entity3 and Entity4 $threeFourDeepEqual")

    // Calling extension function
    DataEntity.Medium("So middle class ", "Middle name").print()
}