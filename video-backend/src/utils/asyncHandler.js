const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
 }


export { asyncHandler }





// basic to understand  asynchandler
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => {() => {}}
// make it async
// const asyncHandler = (fn) => async () => {}

 // asyncHandler is Higher Order Function, HOF kiya hoti hain,
 // wo functions joke functions ko  as parameters bhi accpet kare skate hain,
 // ya usko return bhi kar skate hain, yee variable ke tarah treat hote hain

//  const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)

//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         }) 
//     }
//  }