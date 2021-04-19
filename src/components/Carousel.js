import React, { useState } from "react";
import "./Carousel.css";
import AllItemList from '../itemList.json'

function Carousel() {
    const [itemList, setItemList] = useState(AllItemList);
    const [currentIndex, setCurrentIndex] = useState(itemList.length);
    const [currentItem, setCurrentItem] = useState(itemList[currentIndex % itemList.length]);
    const [prevItem, setPrevItem] = useState(itemList[itemList.length - 1]);
    const [nextItem, setNextItem] = useState(itemList[1]);
    let uniqueCategories = [...new Set(AllItemList.map(item => item.category))];

    const prevClickHandler = () => {        
        let index = Math.abs(currentIndex - 1);
        console.log(index);
        let itemLength = itemList.length;
        setCurrentItem(itemList[index % itemLength]);
        setPrevItem(itemList[Math.abs(index - 1) % itemLength]);
        setNextItem(itemList[(index + 1) % itemLength]);
        setCurrentIndex(currentIndex - 1);
    }
    const nextClickHandler = () => { 
        let index = currentIndex + 1;
        let itemLength = itemList.length;
        setCurrentItem(itemList[index % itemLength]);
        setPrevItem(itemList[(index - 1) % itemLength]);
        setNextItem(itemList[(index + 1) % itemLength]);
        setCurrentIndex(index);
       
    }
    const changeCategory = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'all') {
            setItemList(AllItemList);
            setList(AllItemList);
        } else {
            let filteredList = AllItemList.filter(item => item.category === e.target.value);
            setItemList(filteredList);
            setList(filteredList);
        }
    }

    const setList = (list) => {
        setCurrentIndex(list.length)
        setCurrentItem(list[(list.length) % list.length]);
        setPrevItem(list[list.length - 1]);
        setNextItem(list[1]);
    }


    return <div className="div-conatiner">
        <div className="filter-div">
            Filter By: &nbsp;
        <select onChange={changeCategory}>
                <option value='all'>All</option>
                {
                    uniqueCategories.map(item => <option key={item} value={item}>{item}</option>)
                }
            </select>
        </div>
        <div className="img-container img-container1">
            <img src={prevItem.image}></img>
            <span className="left" onClick={prevClickHandler}>&#10094;</span>
        </div>
        <div className="img-container img-container2">
            <img id="current-image" src={currentItem.image}></img>
            <div className="center">
                <div><b>{currentItem.name}</b>&nbsp;({currentItem.category}) </div>
                <div>{currentItem.price}</div>
            </div>
        </div>
        <div className="img-container img-container3">
            <img src={nextItem.image}></img>
            <span className="right" onClick={nextClickHandler}>&#10095;</span>
        </div>
    </div>
}
export default Carousel;