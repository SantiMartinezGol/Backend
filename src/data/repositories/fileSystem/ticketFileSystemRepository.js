import fs from 'fs';
import Ticket from '../../../domain/entities/ticket.js';

class TicketFileSystemRepository {
    #tickets = []
    path = ``;
    lastId = 1

    constructor() {
        this.#tickets = [];
        this.path = `./src/Tickets.json`;
    } 

    async find(limit, page) {
        const ticketsFile = await fs.promises.readFile(this.path, 'utf-8');
        const tickets = JSON.parse(ticketsFile);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTickets = tickets.slice(startIndex, endIndex);
    
        return {
            docs: paginatedTickets.map(ticket => ({
                id: ticket.id,
                code: ticket.code,
                purchase_datetime: ticketDocument.purchase_datetime,
                amount: ticketDocument.amount,
                purchaser: ticketDocument.purchaser
            })),
            totalDocs: tickets.length,
            limit: limit,
            totalPages: Math.ceil(tickets.length / limit),
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(tickets.length / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(tickets.length / limit) ? page + 1 : null
        };
    }

    async getOne(id) {
        const ticketsFile = await fs.promises.readFile(this.path, 'utf-8')    
        let tickets = JSON.parse(ticketsFile)
        let ticket = tickets.find((t) => t.id === id);
        if (!ticket) {
        throw new Error('ticket Not Found!');
        }
        return {
            id: ticket.id,
            code: ticket.code,
            purchase_datetime: ticketDocument.purchase_datetime,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser
        }
      
    }

    async create(ticket) {
        const { code, purchase_datetime, amount, purchaser } = ticket;
        const ticketsFile = await fs.promises.readFile(this.path, 'utf-8');
        let newTickets = JSON.parse(ticketsFile);
    
        const size = 24;
        const id = generateUniqueKey(size);
    
        const valid = newTickets.find((t) => t.id === id);
    
        if (valid) {
            throw new Error('Invalid ID');
        }

        newTickets.push({
            id: id,
            code: code,
            purchase_datetime: purchase_datetime,
            amount: amount,
            purchaser: purchaser
        });
        await fs.promises.writeFile(this.path, JSON.stringify(newTickets, null, 2))
        
        return new Ticket ({
            id: id,
            code: code,
            purchase_datetime: purchase_datetime,
            amount: amount,
            purchaser: purchaser
        })
    }

    async updateOne(id, ticket) {
        let ticketsFile = await fs.promises.readFile(this.path, 'utf-8');
        let tickets = JSON.parse(ticketsFile);
        let idTicket = tickets.findIndex((t) => t.id === id);
        if (idTicket === -1) {
            throw new Error('Ticket Not Found!');
        }    
        tickets.splice(idTicket, 1, { id: id, ...ticket });
        await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, 2));
        return {
            id: id,
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser
        };
    }
    

    async deleteOne(id) {
        let ticketsFile = await fs.promises.readFile(this.path, 'utf-8')
        let tickets = JSON.parse(ticketsFile);
      
        const idTicket = tickets.findIndex((t) => t.id === id);
        if (idTicket===-1) 
        {
            throw new Error('Ticket Not Found!');
        }
        tickets.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, 2));
        return;
    }
}

export default TicketFileSystemRepository;