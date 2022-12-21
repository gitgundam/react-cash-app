import React from 'react'

const list = [1, 2, 3, 4]
const Welcome = () => {
  return (
    <div className='border  h-100vh flex flex-col' >
      <header border="2 rounded red" h-20px ml-10 mr-10></header>
      <main className='flex-1 border'>
        {list.map((item, index) => <div key={index} className='items-center text-center'>{item}</div>)}
      </main>
      <footer className='h-20px border'></footer>
    </div>
  )
}

export default Welcome
