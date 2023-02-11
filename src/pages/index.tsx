import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  // const [products, setProducts] = useState<{
  //   id: string
  //   properties: { id: string }[]
  // }>([])
  const [products, setProducts] = useState<{
    id: string
    name: string
    createAt: string
  }>([])
  // useEffect(() => {
  //   fetch('/api/get-items')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [])

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])
  // const handleClick = () => {
  //   if (inputRef.current == null || inputRef.current.value == '') {
  //     alert('name을 넣어주세요.')
  //     return
  //   }
  //   fetch(`/api/add-item?name=${inputRef.current.value}`)
  //     .then((res) => res.json())
  //     .then((data) => alert(data.message))
  // }
  // const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h2> Product List </h2>
          <div>
            {products &&
              products.map((item) => (
                <div key={item.id}>
                  {item.name}
                  <p>{item.createAt}</p>
                </div>
              ))}
          </div>

          {/* <div>
            {products &&
              products.map((item) => (
                <div key={item.id}>
                  {JSON.stringify(item)}
                  <p>
                    {item.properties &&
                      Object.entries(item.properties).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => {
                            fetch(
                              `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                            )
                              .then((res) => res.json())
                              .then((data) =>
                                alert(JSON.stringify(data.detail))
                              )
                          }}
                        >
                          {key}
                        </button>
                      ))}
                  </p>
                </div>
              ))}
          </div> */}
        </div>
      </main>
    </>
  )
}
