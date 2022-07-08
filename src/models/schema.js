export const schema = {
    "models": {
        "License": {
            "name": "License",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "purchaseType": {
                    "name": "purchaseType",
                    "isArray": false,
                    "type": {
                        "enum": "PurchaseTypeEnum"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "licenseTerms": {
                    "name": "licenseTerms",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "renewalDate": {
                    "name": "renewalDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "comments": {
                    "name": "comments",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Licenses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "PurchaseTypeEnum": {
            "name": "PurchaseTypeEnum",
            "values": [
                "MARKETPLACE_PUBLIC",
                "MARKETPLACE_PRIVATE",
                "DIRECT_VENDOR"
            ]
        }
    },
    "nonModels": {},
    "version": "3bb71db52cbb78781e770050e0c4eb3d"
};