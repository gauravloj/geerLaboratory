fun main() {
    val info = BasicInfoProvider()
    info.printInfo(PersonWithDefault())

    val infoDef = BasicInfoProviderWithoutDef()
    infoDef.printInfo(PersonWithDefault())

    checkTypes(info)
}

fun checkTypes(infoProvider: PersonInfoProvider){
    /*
    To check for not an instance, use below syntax
    if (infoProvider !is SessionInfoProvider){
     */
    if (infoProvider is SessionInfoProvider){
        println("It is session you called")
        // Once confirmed, var can be casted to SessionInfoProvider
        (infoProvider as SessionInfoProvider).getSession()
        /*
            Above statement is equivalent to infoProvider.getSession()
            As compiler implicitly cast the type of infoProvider
         */
    } else {
        println("Call again for something else other than session")
    }
}