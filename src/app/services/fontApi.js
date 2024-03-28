// // _HANDLE RATE FAVORITE ______________________________________________________________________________
// const handleRating = (userId, fontId, fontName, rating) => {
//     setRatings((prev) => ({
//         ...prev,
//         [fontName]: rating,
//     }));
//     sendRate(userId, fontId, rating);
// };

// const sendRate = async (userId, fontId, rating) => {
//     try {
//         const res = await axios.post("/fonts/rate", { userId, fontId, rating });
//         return res.status === 200;
//     } catch (err) {
//         console.error("FAILED : Try to rate typeface => ", err);
//     }
// };

// const getRate = async (userId) => {
//     try {
//         const res = await axios.post("/fonts/rate/getAll", { userId });
//         const fontRates = res.data.data;
//         fontRates.forEach((rate) => {
//             setRatings((prev) => ({
//                 ...prev,
//                 [rate.fontName]: rate.rating,
//             }));
//         });
//     } catch (err) {
//         console.error("FAILED : Try to get all rates => ", err);
//     }
// };
