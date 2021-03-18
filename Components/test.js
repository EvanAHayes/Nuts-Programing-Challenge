import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"


const UserList = ({ userData }) => {
  const [users, setUsers] = useState([])
  const router = useRouter()
  // Set users from userData
  useEffect(() => {
    if (userData) {
      if (userData.error) {
        // Handle error
      } else {
        setUsers(userData.users)
      }
    }
  }, [userData])
  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = () => {
    // To get page offset of last user
    const lastUserLoaded = document.querySelector(
      ".user-list > .user:last-child"
    )
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight
      // Detects when user scrolls down till the last user
      if (pageOffset > lastUserLoadedOffset) {
        // Stops loading
        if (userData.curPage < userData.maxPage) {
          // Trigger fetch
          const query = router.query
          query.page = parseInt(userData.curPage) + 1
          router.push({
            pathname: router.pathname,
            query: query,
          })
        }
      }
    }
  }
  return (
    <>
      <ul className="user-list">
        {users.length > 0 &&
          users.map((user, i) => {
            return (
              <li className="user" key={i}>
                <span>{user.name}</span>
              </li>
            )
          })}
      </ul>
    </>
  )
}
export default UserList