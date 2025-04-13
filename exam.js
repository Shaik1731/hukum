function CalculatorLibrary(Borroweditems){
    let standardDailyFine=0.25
    let maxPeriodicalFine=10
    let discount=3 
    let discountRate=0.5
    let calculateItemBaseFine=(item)=>{
      let fine=item.daysOverdue*standardDailyFine
      if(item.isReserved){
        fine *=2
      }
      return fine
    }
    let adjustForCategory=(baseFine,item)=>{
      if(item.category == "Periodical"&& baseFine > maxPeriodicalFine){
        return maxPeriodicalFine
      }
      return baseFine;
    }
    let initialTotalFine=Borroweditems.map(item =>calculateItemBaseFine(item)).reduce((sum,fine)=>sum+fine,0);
    let adjustedFines=Borroweditems.map((item,index)=>adjustForCategory(calculateItemBaseFine(item),item))
    let totalFineAfterCategory=adjustedFines.reduce((sum,fine)=>sum + fine,0)
    let finalFine=totalFineAfterCategory;
    if(Borroweditems.length >= discount){
      finalFine *=discountRate
    }
    return{
      originalFine : initialTotalFine,
      adjustedFine: totalFineAfterCategory,
      finalFine: finalFine
    }
  }
    let Borroweditems= [
    { title: "Harry Potter", daysOverdue: 5, category: "Fiction", isReserved: false },
    { title: "Physics Textbook", daysOverdue: 12, category: "Academic", isReserved: true },
    { title: "Cooking Magazine", daysOverdue: 3, category: "Periodical", isReserved: false },
    { title: "Programming Guide", daysOverdue: 8, category: "Academic", isReserved: false }
  ]
  const fines=CalculatorLibrary(Borroweditems)
  console.log(`original fine amount : $${fines .originalFine.toFixed(3)}`)
  console.log(`After special category adjustments :$${fines.adjustedFine.toFixed(2)}`)
  console.log(`Final fine after all calculation : $${fines.finalFine.toFixed(2)}`)
  