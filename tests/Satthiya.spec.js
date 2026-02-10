 const {test, expect, request} = require('@playwright/test');


 const LoginPayload = {email: "tinker.bell@dummyinbox.com", password: "123456789"}
 const AboutmePayload = {
    bio: "I am a positive and hardworking person who enjoys learning new things and taking on new challenges. I believe in staying organized, being responsible, and giving my best in everything I do. I like working with people and sharing ideas.",
    relationshipStatus: "SINGLE", personality: "Extrovert", gender: "Female", economicStatus: "—", healthStatus: ""}
const LocationPayload = {country: "India",state: "Haryana",city: "Panipat", willingToRelocate: true}


test.beforeAll('@Saathiya Login via API', async ()=>
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

 test('@Saathiya Update User Profile using API ', async ()=>
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