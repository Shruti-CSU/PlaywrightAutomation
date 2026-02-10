 const {test, expect, request} = require('@playwright/test');


 const LoginPayload = {email: "Sunny@dummyinbox.com", password: "123456789"}
 const AboutmePayload = {
    bio: "I value relationships built on trust, respect, and open communication. I enjoy connecting with people, supporting and understanding them, and maintaining strong, positive, and meaningful bonds.",
    relationshipStatus: "SINGLE", personality: "Introvert", gender: "Male", economicStatus: "—", healthStatus: ""}
const LocationPayload = {country: "India",state: "Gujarat",city: "Surat", willingToRelocate: false}


test.beforeAll('@API Login via API', async ()=>
{
    //Create API Context
   const apiContext = await request.newContext();

   apiContext.on('request', request=> {console.log(request.url())});
   apiContext.on('response', response=> {console.log(response.url(), response.status())});

   //Login API
   const LoginAPIResponse = await apiContext.post("https://saathiya-web.vercel.app/api/auth/login/password",
    {
        data: LoginPayload,
        
    }
   );

   const LoginJson = await LoginAPIResponse.json();
   console.log(LoginJson);
   
   expect(LoginAPIResponse.ok()).toBeTruthy();

   // Storing session cookie
   await apiContext.storageState({ path: 'cookie.json' });

});

 test('@API Update User Profile using API ', async ()=>
{
    //Injecting cookies here
    const apiContext = await request.newContext({storageState: 'cookie.json'});

    // Update About Me section
    const UpdateaboutMe =  await apiContext.patch("https://saathiya-web.vercel.app/api/profile/me",
        {
            data: AboutmePayload,
            headers: {
                "Content-Type" : "application/json"
            }
        }
    );

    expect(UpdateaboutMe.ok()).toBeTruthy();

    const MeJson = await UpdateaboutMe.json();
    console.log(MeJson);

    // Update Location in profile
    const UpdateLocation = await apiContext.patch("https://saathiya-web.vercel.app/api/profile/me",
        {
            data : LocationPayload,
            headers: {
                "Content-Type" : "application/json"
            }
        }
    )

    expect(UpdateLocation.ok()).toBeTruthy();

    const UpdateLocationJson = UpdateLocation.json();
    console.log(UpdateLocationJson);
    console.log('Done');
});