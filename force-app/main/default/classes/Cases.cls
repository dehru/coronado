public with sharing class Cases {
    public Cases() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Case__c> getCases() {
        return [
        SELECT
            Name,
            Count__c,
            Date__c
            FROM Case__c 
            ORDER BY Date__c
        ];
    }
}
