import { create } from 'zustand'

export const pageController = create((set, get) => ({ 
  selected: 'Home',
  myRef: { current: null },
  setRef: (el) => {
    get().myRef.current = el
  },
  slide: 2,
  slideCard: 0,
  animation: 1,
  pageUnlock: 1,  
  mainNavbarAnimDone: false,
  isRegisteredNotification: false, 
  selectedIsReply: 0, 
  replyIsSent: false,  
  LeftBarContent: ["Engineering","Sensha Do Winters","Tank Collection","Collaboration"],
  setPageUnlock: (pageUnlock) => set({ pageUnlock }),
  setAnimation: (animation) => set({ animation }),
  setSlide: (slide) => set({ slide }),
  setSlideCard: (slideCard) => set({ slideCard }),
  setSelected: (selected) => set({ selected }),
  setIsRegisteredNotification: (isRegisteredNotification) => set({ isRegisteredNotification }) ,
  setMainNavbarAnimDone : (mainNavbarAnimDone) => set({mainNavbarAnimDone}), 
  setSelectedIsReply : (selectedIsReply) => set({selectedIsReply}), 
  setReplyIsSent : (replyIsSent) => set({replyIsSent}), 
}))


