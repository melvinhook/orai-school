import { create } from 'zustand';
import axios from 'axios';
import { pageController } from './pageController';
import { postApi } from './postApi';
export const useApi = create((set, get) => ({
  getUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return null;
      }
      const res = await fetch("https://oarai-school-backend-production-513d.up.railway.app/users/get_current_user", {
        method: "GET",
        headers: {
          "X-Custom-Auth": `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch user:", res.status, errorText);
        return null;
      }
      const data = await res.json();
      console.log("=== CURRENT USER RESPONSE ===");
      console.log(res.data);
      return data;
    } catch (error) {
      console.error("❌ FAILED TO FETCH CURRENT USER:", error.response?.data || error);
      return null;
    }
  },
  posttest: async (contents) => {
    try {
      response = await axios.post("https://oarai-school-backend-production-513d.up.railway.app/test", {
        content: contents
      })
    } catch (error) {
      set({ isloading: false })
      console.error("Login failed:", error.response?.data || error.message)
    }
  },
  getpost: async () => {
    try {
      const response = await axios.get("https://oarai-school-backend-production-513d.up.railway.app/post/1")
      console.log(response.data)
      postApi.getState().setId(response.data.id);
      console.log("This is the id", postApi.getState().id)
      return response.data
    } catch (error) {
      console.error("Fetch posts failed:", error.response?.data || error.message)
      return []
    }
  },
  gettestimony: async () => {
    const response = await axios.get("/testimonials.json")
    return response.data
  },
  login: async (username, password) => {
    set({ isloading: true })
    set({ isloginerror: false })
    const temp = []
    if (username !== '' && password !== '') {
      try {
        console.log("=== LOGIN REQUEST ===");
        temp.length = 0
        set({ lempty: temp })
        const formData = new URLSearchParams()
        formData.append("username", username)
        formData.append("password", password)
        const res = await axios.post("https://oarai-school-backend-production-513d.up.railway.app/jwtlogin/", formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        set({ isloading: false })
        set({ isloggedin: true })
        localStorage.setItem("token", res.data.access_token)
        console.log("=== LOGIN RESPONSE ===");
        console.log(res.data);
        console.log("LOGIN SUCCESFULL")
      } catch (error) {
        set({ isloading: false })
        set({ isloginerror: true })
        console.error("❌ LOGIN FAILED:", error.response?.data || error);
        get().addToLempty(['username', 'password'])
      }
    } else {
      set({ isloading: false })
      set({ lerrormessage: "Complete the form!" })
      if (username === '') {
        temp.push('username')
      }
      if (password === '') {
        temp.push('password')
      }
      set({ lempty: temp })
    }
  },
  addToLempty: (newItems) => set((state) => ({ lempty: [...state.lempty, ...newItems], })),
  changeToCompletion: () => {
    set({ iscompleteaccount: true })
  },
  register: async (username, email, password, firstname, lastname, borndate) => {
    console.log("Register is clicked");
    set({ isloading: true });
    const temp = [];
    if (firstname !== '' && lastname !== '' && borndate !== '') {
      set({ errormessage: "" });
      temp.length = 0;
      set({ empty: temp });
      try {
        console.log("Trying register with photo upload");
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("borndate", borndate);
        if (get().profileImage) {
          formData.append("file", get().profileImage);
        }
        const response = await axios.post(
          "https://oarai-school-backend-production-513d.up.railway.app/users/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("✅ User registered:", response.data);
      } catch (error) {
        console.error("❌ Register failed:", error.response?.data || error.message);
      } finally {
        set({ isloading: false });
        const { setIsRegisteredNotification } = pageController.getState();
        setIsRegisteredNotification(true);
      }
    } else {
      set({ errormessage: "Complete the form!" });
      if (username === '') temp.push('firstname');
      if (email === '') temp.push('lastname');
      if (password === '') temp.push('borndate');
      set({ empty: temp });
    }
  },
  registercheckphase1: async (username, password, email) => {
    console.log("checked")
    set({ isfirstchecked: true })
    if (get().isfirstchecked) {
      console.log("Successfully Checked")
    }
    const temp = []
    if (username !== '' && email !== '' && password !== '') {
      console.log("All Set")
      set({ iscompleteaccount: true })
    } else {
      if (username === '') {
        temp.push('Username')
      }
      if (email === '') {
        temp.push('Email')
      }
      if (password === '') {
        temp.push('Password')
      }
      set({ empty: temp })
    }
  },
  verify: async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://oarai-school-backend-production-513d.up.railway.app/users/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  },
  getprofile: (e) => {
    const file = e.target.files[0];
    if (file) {
      set({
        profileImage: file, // the actual file
        profilePreview: URL.createObjectURL(file), // optional preview
      });
    }
  },
  removeEmpty: (item) => {
    console.log("removed")
    set((state) => ({
      empty: state.empty.filter((i) => i !== item),
    }))
  },
  uploadProfilePhotos: async () => {
    console.log("Uploading temporary profile photo...");
    const file = get().profileImage;
    const username = get().username; // pastikan kamu punya data ini
    if (!file || !username) {
      console.error("Missing file or username for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    try {
      const response = await axios.post(
        "https://oarai-school-backend-production-513d.up.railway.app/posts/upload_photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      set({ uploadedUrl: response.data.url });
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  },
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  profileImage: null,
  testimonydata: '',
  borndate: null,
  islogin: false,
  isloggedin: false,
  isloginerror: false,
  isloading: false,
  iswelcome: false,
  iscompleteaccount: false,
  iscompleteaccountphase: 1,
  isfirstchecked: false,
  label: '',
  message: '',
  errormessage: '',
  lerrormessage: '',
  empty: [],
  lempty: [],
  settestimonydata: (testimonydata) => set({ testimonydata }),
  setemail: (email) => set({ email }),
  setusername: (username) => set({ username }),
  setfirstname: (firstname) => set({ firstname }),
  setlastname: (lastname) => set({ lastname }),
  setpassword: (password) => set({ password }),
  setprofileImage: (profileImage) => set({ profileImage }),
  setborndate: (borndate) => set({ borndate }),
  setislogin: (islogin) => set({ islogin }),
  setlabel: (label) => set({ label }),
  setmessage: (message) => set({ message }),
  setisloading: (isloading) => set({ isloading }),
  setisloggedin: (isloggedin) => set({ isloggedin }),
  setiswelcome: (iswelcome) => set({ iswelcome }),
  setiscompleteaccountphase: (iscompleteaccountphase) => set({ iscompleteaccountphase }),
}))