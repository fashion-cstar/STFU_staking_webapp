export const calcRarity = async () => {
    let kk: number[] = []
    for (let i = 1; i <= 600; i++) {
        kk.push(i)
    }
    let traits_rarity = [
        {
            "trait_type": "Background",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Skin Color",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Tattoo",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Pants",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "T-Shirt",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Coat",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Mouth",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Eyes",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Hair",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Nose",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Gloves",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Holding",
            "includes": [],
            "total": 600
        },
        {
            "trait_type": "Necklace",
            "includes": [],
            "total": 600
        }
    ]
    await Promise.all(kk.map(async (i) => {
        try {
            const metadata = await fetch(`https://ipfs.io/ipfs/bafybeibvsmui6ampdkuthtx72ugd7iricrckyxflvwxvokeorpl7tsjjri/${i}.json`).then((res) => res.json())
            metadata.attributes.map((attr) => {
                let index = traits_rarity.findIndex((item) => item.trait_type == attr.trait_type)
                let item = traits_rarity[index]
                let index1 = item.includes.findIndex((k) => k.value == attr.value)
                if (index1 >= 0) {
                    item.includes[index1].count++
                    item.includes[index1].percent = Math.round(item.includes[index1].count / 600 * 1000000) / 10000
                } else {
                    item.includes.push({ value: attr.value, count: 1, percent: Math.round(1 / 600 * 1000000) / 10000 })
                }
                traits_rarity[index] = item
            })
        } catch (err) { }
    }))
    console.log(traits_rarity)
}