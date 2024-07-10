import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { collection, getFirestore, getDocs, onSnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStoryByName } from '../../utils/apiFunctions'
import { Link } from 'react-router-dom'
import HistoryCard from "../../components/Story/HistoryCard/HistoryCard"

export default History = () => {

  const [storyList, setStoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchReadingHistory = (uid) => {
      try {
        const unsubscribe = onSnapshot(collection(db, "users", uid, "history"), async (querySnapshot) => {
          const promises = querySnapshot.docs.map(async (doc) => {
            const { name, chapter, domain } = doc.data();
            const result = await getStoryByName(domain, name);
            if (result?.success) {
              return {
                name,
                image: result.data.image,
                domain,
                chapter,
                title: result.data.title,
              };
            }
          });

          const stories = await Promise.all(promises);
          setLoading(false);
          setStoryList(stories.filter(Boolean)); // Loại bỏ các giá trị undefined nếu có
          console.log('All stories have been processed:', stories);
        });

        // Trả về hàm unsubscribe để có thể hủy bỏ listener khi không cần thiết
        return unsubscribe;
      } catch (e) {
        console.error('Error fetching reading history:', e);
      }
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchReadingHistory(user.uid);
      }
    })
  }, [])

  return (
    <Container>
      <Row className="justify-content-center align-items-center gap-2 mt-2">
        <Container>
          <h3>History</h3>
          {
            loading ?
              (<div>Loading...</div>)
              :
              <>
                {storyList?.length > 0 && (
                  <div className="history-big-container" style={{ display: "flex" }}>
                    {storyList.map((story, index) => (
                      <HistoryCard story={story} index={index} />
                    ))}

                  </div>
                )}
                {(storyList?.length == 0) && (<p>No story</p>)}
              </>
          }
        </Container>
      </Row>
    </Container>
  )
}
