/*
By default, classes are closed for inheritance.
To make a class available for inheritance 'open' keyword is used while defining the class
Eg. open class BasicinfoProvider.

Now this class can be inherited by another class
class FancyInfoProvider: BasicInfoProvider()
 */

class FancyInfoProvider: BasicInfoProviderWithoutDef() {

    // to override parent class variable, open keyword is used in parent class variable
    override val sessionId: String
        get() = "Fancy sessionId"

    override val providerInfo: String
        get() = "Fancy provider"

    override fun printInfo(person: PersonWithDefault) {
        super.printInfo(person)
        println("Overriding fancy one")
    }
}