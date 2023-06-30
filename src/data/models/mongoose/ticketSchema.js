import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: { type: Schema.Types.String, required:true },
    purchase_datetime: { type: Schema.Types.Date, required: false },
    amount: { type: Schema.Types.Number, required: false },
    purchaser: { type: Schema.Types.String, required: false },
  
  });

ticketSchema.plugin(paginate);

export default mongoose.model(ticketCollection, ticketSchema);