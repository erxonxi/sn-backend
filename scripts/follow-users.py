import requests
import json
import uuid

user_ids = ["4d914041-d04d-438c-bd16-f146a0450ad5","0ff2d3c1-395f-4871-82e4-cf152597b86b","8029d9e5-757f-443d-8f75-6252d55d1fc6","514bc43a-e2ab-4e4d-9981-da67a8f70c68","a901fb33-c93c-45a2-91f8-6e3f1300f2ff","135bc4ba-8e99-4c68-8e07-a8c14662209b","5e5b60f5-9542-4103-8de3-ef2d0712cd4b","7677d25e-49fe-4001-ab4c-6e800f076132","5dd28d08-c238-45ef-a130-e25c48a8e411","3f754099-759f-4c6e-bf99-d9c366b73167","0a2da271-8ede-4b88-95d4-ac0534de93e4","dd968cf7-75db-4aeb-a2d8-de459edbe558","58c63bc5-00ef-4b47-a2d7-4beee4e5c8fc","1650936f-b4f0-4dbd-b13f-d03a86467ac6","e596beb4-1709-421e-8476-358bb6429858","2caa7eb1-d29f-42b2-84fd-546554773838","aefdc14e-3f81-437f-841f-a0c991255392","0958b517-d692-4cf4-bd58-5881d4afbd90","f8a0ec0d-dc44-40b3-b048-39825fe4907a","0bb9938a-7730-446e-b6ba-422e0b6973c2","1c623888-4e38-4cc6-be78-a73ed0a4bd34","177432ab-ffb7-460d-83af-ed8781782dcb","c268afef-65ed-47bf-8a7d-07518a77ea5e","9deeddbb-08ad-46e2-9306-8054ddceb408","7fa4b4e1-4767-4bfb-96ad-dcc516f82d2f","8e276029-96f8-4565-b09f-e202e8aba518","928f6b0a-305e-403c-83f3-760c95956ec1","b2121b66-75e4-4a29-a91f-1c443e98fbdb","c3e99a5d-f589-4346-9a70-b37152db8134","4c491db5-0f2c-4652-a9fe-358fb52e5b0c","9db25601-01a6-40c2-af52-a3764295ceda","cbab69e5-19cc-4350-8430-5c26fbbf77c7","4777c469-8760-4bb7-ac1b-71a4d11d5ffb","d6e22cba-f0dd-449d-9171-02794cdb236d","ffcf2dff-9f85-4f8c-ad05-446ef3c33e67","823d6600-c919-40c7-9add-2d37bfb1d0c8","2f1b7d76-ead3-4f5b-956d-26d1d0eeb04c","286e9dad-af66-4f47-9655-8706d68a5ac3","ba951f2e-ebb7-4a03-bdd4-1bc484ee7fdb","9cbac289-e7e3-4a60-85fa-b356c8867274","8c9582be-eb0c-43be-9e02-2ecad71a942e","f7c44ece-9766-4dc5-bc15-6ab7b6380310","2d820ae9-7618-490d-ae49-52629ec9a0db","be711a53-946c-47c1-aeb8-dcd5c8a3ef65","5ae6ed9b-6d18-4712-af4c-258f2fe2a05f","9fb00112-9906-433c-a0e4-26102496e04a","cc13510d-e1fb-4d28-80da-7325200c801c","0e87e9d5-1fcf-4308-9a79-1293f7925684","99affcae-937b-4ab0-af91-d148e0d2f13d","d22a6e38-4f6d-4174-80b3-d2c0fb451ae3","87b59107-99df-4d7a-8062-18e56c478b3a","17f56619-4061-4b77-8ad6-4e1f85ff1ed3","245202c7-3e51-4577-8f51-4ffa7b720325","576c7f40-a9d6-413d-bb29-4cc333461b90","0c86635a-b5d0-4b2d-87a6-51d017b7ecee","6485099a-cd19-438a-bd77-e3e7ee4ae50b","822c48f5-8ef7-4046-a694-fe7d361c8547","7d4c5d5c-50f2-4e87-a5ed-4a3fcd209338","ed05f165-0ef6-49e5-aa05-b8b4b1b830e9","2f80ae8d-64f3-4d08-a75a-b34fabec244d","8906fdf7-ad62-4287-ab13-4e80710d0e06","6503e25f-7bdc-4d49-8118-f1c31249afce","db8550d9-ed0f-480c-bdc9-5b7f4cba02dd","e8d5633c-1740-476d-9c7e-7c9f6ad9c8d9","6bdddf02-20ea-4770-bcd6-f75a912db418","3ce67422-ef53-463b-82f0-8e0c57cb55c3","31525215-bb05-4f7e-b558-a6bb457711af","c1d63fe7-340d-46fe-87d8-e8257d7229c2","2112e668-249c-4677-9b29-f63a31f12a88","6786501c-0236-4455-bf04-d447fd063358","0431754b-140d-4ea8-ba21-b54c47ea0fe0","f2281ae1-3d28-4da1-97f0-ab2b2856a75e","6efa982f-dca2-422b-80ef-21bdf5c9e202","ead3a81d-8e63-44f7-92d3-3564c86c8840","a28963a5-4e56-493a-926b-4373854951f1","ad495674-ea53-4209-a252-dc28d0958d80","2e7d0414-2b40-4688-af1c-f2f16b46c9a8","971f50bd-2e09-4676-9caf-5c68f368a5a5","558412c1-6621-4b31-897a-cfe815fb5ef8","ea5c499d-2309-4733-9ec4-5ceeb42d6aca","5a25ced2-0821-455e-935a-56544c431ec4","259b9425-0a65-49f2-bf9d-0b1514a1b515","e247de42-a938-4925-99cb-b2503b60fc00","f15e4d36-33c3-4979-96bb-4fc0051198b2","fd609f12-9af0-4200-960f-89a515e8cf6b","cb4d1c68-d549-487d-a6c8-80e29aa492fd","5244eb2f-af38-4757-89b9-4dbbf0ec5789","c133236c-8242-45b4-9f6e-e5192d85f631","519957d0-15a5-422f-98f8-b2ab7df4a38e","54dec0ec-3ffd-4926-8b64-f88992f784b4","fc1f9b4e-1167-49fc-a2fc-3cf96476ac66","978ab05f-7047-454e-9213-0970d6bbef92","7a555978-935e-4d33-a6f1-ea601d50bdc0","8bb8d993-5d25-4897-b79a-b1ebe1151c3e","932716ce-8c9c-4a38-abaa-db4f75431dbd","6293a495-7ffa-487c-b810-f15c457548a0","9066d521-489a-43e6-a881-5b37e13a75d7","f120ca62-695c-4247-93d0-a1b13a4b1785","ddeaee8e-defc-452d-93fa-784b1ea93bbc"]
# user_ids = ["4d914041-d04d-438c-bd16-f146a0450ad5"]

def get_token(email: str):
    url = 'http://localhost:5001/v1/users/session'
    headers = {'Accept': 'application/json'}

    response = requests.post(url, headers=headers, data={
        "email": email,
        "password": "admin"
    })

    return json.loads(response.text)["token"]

def follow_user(token: str, userId: str):
    url = 'http://localhost:5002/v1/followers'
    headers = {'Accept': 'application/json', 'Authorization': 'Bearer {}'.format(token)}

    response = requests.put(url, headers=headers, data={
        "id": str(uuid.uuid4()),
        "toFollowUserId": userId
    })

def create_post(token: str, message: str):
    url = 'http://localhost:5003/v1/posts'
    headers = {'Accept': 'application/json', 'Authorization': 'Bearer {}'.format(token)}

    response = requests.put(url, headers=headers, data={
        "id": str(uuid.uuid4()),
        "profileName": "Admin",
        "message": message
    })

    print(response)

def main():
    for i in range(1, 100):
        token = get_token("admin{}@mail.com".format(i))
        for user_id in user_ids:
            follow_user(token, user_id)
            print("User 'admin{}@mail.com' followed user id '{}'".format(i, user_id))

def main_create_post():
    for i in range(1, 100):
        token = get_token("admin{}@mail.com".format(i))
        create_post(token, "Soy el usuario admin{}@mail.com".format(i))

if __name__ == "__main__":
    main()
    #main_create_post()