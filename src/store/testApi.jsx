import { create } from 'zustand';
import { pageController } from './pageController';
import axios from 'axios';
export const postApi = create((set, get) => ({
    commentIsLoading: false,
    content: "",
    replyContent: "",
    title: "",
    desc: "",
    setContent: (content) => set({ content }),
    setReplyContent: (replyContent) => set({ replyContent }),
    postcomment: async (post_id, user_id) => {
        set({ commentIsLoading: true })
        try {
            const res = await axios.post(`http://localhost:8000/comment`, {
                content: get().content,
                user_id,
                post_id,
            })
            console.log("✅ Comment success:", res.data)
            set({ content: "" })
            set({ commentIsLoading: false })
            return res.data
        } catch (error) {
            set({ commentIsLoading: false })
            console.error("❌ Comment error:", error.response?.data || error)
        }
    },
    postreply: async (comment_id, user_id) => {
        const { setReplyIsSent, setSelectedIsReply } = pageController.getState();
        setReplyIsSent(true)
        try {
            const res = await axios.post(`http://localhost:8000/reply`, {
                content: get().replyContent,
                user_id,
                comment_id,
            })
            console.log("✅ Comment success:", res.data)
            set({ replyContent: "" })
            setReplyIsSent(false)
            setSelectedIsReply("")
            return res.data
        } catch (error) {
            setReplyIsSent(false)
            setSelectedIsReply("")
            console.error("❌ Comment error:", error.response?.data || error)
        }
    },
    postlikes: async (post_id, user_id) => {
        try {
            const res = await axios.post("http://localhost:8000/postlikes", {
                post_id, user_id
            })
            console.log("✅ Post Like Success:", res.data)
            return res.data
        } catch (error) {
            console.error("❌ Post Like error:", error.response?.data || error)
        }
    },
    commentlikes: async (comment_id, user_id) => {
        try {
            const res = await axios.post("http://localhost:8000/commentlikes", {
                comment_id, user_id
            })
            console.log("✅ Comment Like Success:", res.data)
            return res.data
        } catch (error) {
            console.log("❌ Comment Like Success:", res.data)
        }
    },
    replylikes: async (reply_id, user_id) => {
        try {
            const res = await axios.post("http://localhost:8000/replylikes", {
                reply_id, user_id
            })
            console.log("✅ reply Like Success:")
            return res.data
        } catch (error) {
            console.error("❌ Reply Like error:", error)
        }
    },
    posttest: async () => {
        try {
            const res = await axios.post("http://localhost:8000/test/posttest", {
                title, desc
            })
            console.log("✅ reply Like Success:")
            return res.data
        } catch (error) {
            console.error("❌ Reply Like error:", error)
        }
    }
}))