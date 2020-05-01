/*
An interface without any body can be defined as
 interface PersonInfoProvider
 */

interface PersonInfoProvider {
    fun printInfo(person: PersonWithDefault)
}

interface SessionInfoProvider{
    fun getSession(): String
}

interface PersonInfoProviderWithDef {
    val providerInfo : String
    fun printInfo(person: PersonWithDefault){
        println(providerInfo)
        person.getNames()
    }
}

/*
if interface has no method to implement, then class can implement it with below syntax:
class BasicInfoProvider: PersonInfoProvider

Multiple interfaces can be implemented using below syntax
class BasicInfoProvider: PersonInfoProvider, SessionInfoProvider
 */
open class BasicInfoProvider: PersonInfoProvider, SessionInfoProvider {
    override fun printInfo(person: PersonWithDefault) {
        println("Class specific message inside class")
        person.getNames()
    }

    override fun getSession(): String {
        println("Session id is returned")
        return "SessionId"
    }
}

open class BasicInfoProviderWithoutDef: PersonInfoProviderWithDef {
    override val providerInfo: String = "Class specific message"

    protected open val sessionId: String = "Session"

    override fun printInfo(person: PersonWithDefault) {
        super.printInfo(person)
        println("Super function was overridden")
    }

}