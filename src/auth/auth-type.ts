type UserWithToken = { accessToken: string, 
    user: { 
        id: string; 
        nickname: string 
        } 
    }

type PublicAppUser = {
    id: string,
    email: string,
    nickname: string
}