import fs from 'fs';

class TicketFileSystemRepository {
    #tickets = []
    path = ``;
    lastId = 1

    constructor() {
        this.#tickets = [];
        this.path = `./Tickets.json`;
    } 

    async find(limit, page) {
        
        let ticketsFile = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(ticketsFile)   
    }

    async getOne(id) {
        try
        {
            const ticketsFile = await fs.promises.readFile(this.path, 'utf-8')    
            let tickets = JSON.parse(ticketsFile)
            let ticket = tickets.find((p) => p.id === id);
            if (!ticket) {
            throw new Error('ticket Not Found!');
            }
            return {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            code: ticket.code,
            price: ticket.price,
            stock: ticket.stock,
            category: ticket.category,
            status: ticket.status
            }
        }
        catch(e){

        }
    }

    async create(ticket) {
        const { title, description, price, code, status, stock, category } = ticket;
        const ticketsFile = await fs.promises.readFile(this.path, 'utf-8')
        let newtickets = JSON.parse(ticketsFile)

        const valid = newtickets.find((p) => p.id === ticket.id || p.code === ticket.code);

        if (valid) 
        {
            throw new Error ('ID o CODE repetido')
        }

        if (title === undefined || description === undefined || price === undefined || code === undefined || stock === undefined || category === undefined) 
        {
            throw new Error ('All fields required')
        } 
        //Busca el maximo id por si la lista esta desordenada!
        this.lastId = Math.max(...newtickets.map(p => p.id)) + 1;
        newtickets.push({
            id: this.lastId++,
            ...ticket,
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newtickets, null, 2))
        
        return {
            id: id,
            title: ticket.title,
            description: ticket.description,
            code: ticket.code,
            price: ticket.price,
            stock: ticket.stock,
            category: ticket.category,
            status: ticket.status
        }
    }

    async updateOne(id, ticket) {
       
        let ticketsFile = await fs.promises.readFile(this.path, 'utf-8')
        let tickets = JSON.parse(ticketsFile);
        let idNumber = parseInt(id)
        let idticket = tickets.findIndex((p) => p.id === idNumber);
        if (!idticket)
        {
            throw new Error('ticket Not Found!');    
        }    
        tickets.splice(idticket, 1, { id: idNumber, ...ticket });
        await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, 2))

        return {
            id: id,
            title: ticket.title,
            description: ticket.description,
            code: ticket.code,
            price: ticket.price,
            stock: ticket.stock,
            category: ticket.category,
            status: ticket.status
        }    

    }

    async deleteOne(id) {
        let ticketsFile = await fs.promises.readFile(this.path, 'utf-8')
        let tickets = JSON.parse(ticketsFile);
        let idNumber = parseInt(id)
        const idticket = tickets.find((p) => p.id === idNumber);
        if (!idticket) 
        {
            throw new Error('ticket Not Found!');
        }
        let ticketDelete = tickets.filter((p) => p.id !== idNumber);
        await fs.promises.writeFile(this.path, JSON.stringify(ticketDelete, null, 2))
        return 
    }
}

export default TicketFileSystemRepository;