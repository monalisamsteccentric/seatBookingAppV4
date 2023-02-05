import Seat from "../models/SeatModel.js";

const postController = async (req, res) => {
    const { seatsToBook } = req.body;
    const seatNumberBooked = await bookSeats(Seat, seatsToBook);
    if (seatNumberBooked.length === 0) {
      return res.status(400).json({ error: 'No seats available.' });
    }
  
    res.json({ SeatNumberBooked: seatNumberBooked });
  }

  async function bookSeats(Seat, seatsToBook) {
    let seatNumberBooked = [];
  
    const availableSeats = await Seat.find({ isAvailable: true }).sort({ seatNumber: 1 });
  
    // Check if there are enough seats in a row
    function hasSeatsInaRow(array, num) {
      const valueCounts = {};
      for (let i = 0; i < array.length; i++) {
        if (valueCounts[array[i].rowNumber] === undefined) {
          valueCounts[array[i].rowNumber] = 1;
        } else {
          valueCounts[array[i].rowNumber]++;
          if (valueCounts[array[i].rowNumber] === Number(num)) {
            return array[i].rowNumber;
          }
        }
      }
      return -1;
    }
  
    // If there are enough seats in a row, book those seats
    let rowNum = hasSeatsInaRow(availableSeats, seatsToBook);
    if (rowNum >= 0) {
      const seatsThatWillbeBooked = await Seat.find({
        isAvailable: true,
        rowNumber: rowNum
      }).sort({ seatNumber: 1 }).limit(seatsToBook);
  
      for (let i = 0; i < seatsToBook; i++) {
        let seat = seatsThatWillbeBooked[i];
        seat.isAvailable = false;
        await seat.save();
        seatNumberBooked.push(seat.seatNumber);
      }
    } else {
      // Generate combinations of available seats
      const combinationOfSeats = generateCombinations(availableSeats, seatsToBook)
  
      // Find the combination with the least difference between the first and last seat numbers
      const seatsThatShouldBeBooked = findArrayWithLeastDifference(combinationOfSeats)
      for (let i = 0; i < seatsThatShouldBeBooked.length; i++) {
        let seatNum = seatsThatShouldBeBooked[i];
        let seat = await Seat.findOne({ seatNumber: seatNum })
        seat.isAvailable = false
        await seat.save()
        seatNumberBooked.push(seat.seatNumber)
      }
    }
    return seatNumberBooked;
  }
  
  function generateCombinations(array, Inputnumber) {
    let result = [];
  
    function backtrack(start, combination) {
      if (combination.length === Number(Inputnumber)) {
        result.push([...combination]);
        return;
      }
  
      for (let i = start; i < array.length; i++) {
        combination.push(array[i].seatNumber);
        backtrack(i + 1, combination);
        combination.pop();
      }
    }
  
    backtrack(0, []);
  
    return result;
  }
  
  function findArrayWithLeastDifference(arrays) {
    let minDifference = Number.MAX_SAFE_INTEGER;
    let resultArray = [];
    arrays.forEach(array => {
      const sortedArray = array.sort((a, b) => a - b);
      const difference = sortedArray[sortedArray.length - 1] - sortedArray[0];
      if (difference < minDifference) {
        minDifference = difference;
        resultArray = sortedArray;
      }
    });
    return resultArray;
  }
  
  
 

  export default postController;