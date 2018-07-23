import objectFitImages from 'object-fit-images'

// Object fit for sectionSplit
const splitImgRight = document.querySelectorAll('.sectionSplit--imgRight img')
const splitImgLeft = document.querySelectorAll('.sectionSplit--imgLeft img')
objectFitImages(splitImgRight)
objectFitImages(splitImgLeft)