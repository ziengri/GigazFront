/*SLIDER*/
div#slider {
    position: relative;
    padding: 10px 5px;
 overflow: hidden; 
}

div#slider div.slides {
    position: relative;
    display: flex;
    transition: .4s;
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
}

div#slider div.slides div.slide {
    flex-shrink: 0;
    text-align:center;
    margin-right: 20px;
    margin-bottom: 0;
}

div.slide img {
    margin-bottom: 10px;
}

div.col {
    width: 32%;
    padding: 20px;
    transition: .2s;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: white;
    border: solid 1px rgba(0,0,0,0.3);
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
}

div.col img {
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
}