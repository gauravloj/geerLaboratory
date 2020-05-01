import java.util.*

enum class EntytiType{
    HELP, EASY, MEDIUM, HARD;

    fun getFormattedName() = name.toLowerCase().capitalize()
}


object EntityFactory{
    fun create(type: EntytiType) : SealedEntity{
        val id = UUID.randomUUID().toString()
        val name = when(type){
            EntytiType.HELP -> type.name
            EntytiType.EASY -> type.getFormattedName()
            EntytiType.MEDIUM -> "HARD"
            EntytiType.HARD -> type.getFormattedName()
        }
        return when(type){
            EntytiType.HELP -> SealedEntity.Easy(id,name)
            EntytiType.EASY -> SealedEntity.Medium(id,name)
            EntytiType.MEDIUM -> SealedEntity.Hard(id,name, 22f)
            EntytiType.HARD -> SealedEntity.Help
        }
    }
}

sealed class SealedEntity() {
    object Help: SealedEntity() {
        val name = "Help"
    }

    // Data class provide immutable data types
    data class Easy(val id: String, val name: String): SealedEntity()
    data class Medium(val id: String, val name: String): SealedEntity()
    data class Hard(val id: String, val name: String, val weight: Float): SealedEntity()
}

fun main() {
    val entity: SealedEntity = EntityFactory.create(EntytiType.EASY)

    val classType = when(entity){
        SealedEntity.Help -> "Help class"
        is SealedEntity.Easy -> "Easy calss"
        is SealedEntity.Medium -> "Medium classs"
        is SealedEntity.Hard -> "Hard class"
    }

    println(classType)
}