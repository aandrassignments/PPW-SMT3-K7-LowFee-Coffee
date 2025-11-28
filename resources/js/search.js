document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.getElementById('navSearchInput')
    const resultBox = document.getElementById('searchResults')
    input.addEventListener('input', async()=>{
        const query=input.value.trim()
        if(!query){
            resultBox.innerHTML=''
            resultBox.style.display='none'
            return
        }
        try{
            const res = await fetch (`/products/search?searchInput=${encodeURIComponent(query)}`)
            const json = await res.json()
            resultBox.innerHTML=''
            resultBox.style.display='block'
            for (const item of json.data){
                const div = document.createElement('div')
                div.classList.add('search-result-item')
                div.textContent=item.name

                div.addEventListener('click', ()=>{
                    window.location.href=`/products/${item.id}`
                })

                resultBox.appendChild(div)
            }
        }catch(error){
            console.error('Search error : ', error)
        }
    })
})