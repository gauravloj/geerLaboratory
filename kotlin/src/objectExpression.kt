fun main() {
    val provider = object : PersonInfoProviderWithDef{
        override val providerInfo: String
            get() = "Anonymous provider"

        // Apart from overriding parent functions, new functions can be added
        fun getSessionId() = "Anon sessionId"
    }
    provider.printInfo(PersonWithDefault())
    println(provider.getSessionId())
}