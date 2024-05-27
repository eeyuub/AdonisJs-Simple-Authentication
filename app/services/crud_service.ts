import { inject } from "@adonisjs/core"
import { BaseModel } from "@adonisjs/lucid/orm"
import { Payload } from "../interfaces/payload_type.js";
import db from "@adonisjs/lucid/services/db";

@inject()
export class CrudService {

  protected model: typeof BaseModel;

  constructor(model: typeof BaseModel) {
    this.model = model;
  }

  /**
   * Retrieves all entries from the model with pagination.
   * @param limit The maximum number of entries to return per page. Defaults to 10.
   * @param page The page number to retrieve. Defaults to 1.
   * @returns A paginated list of entries.
   */
  async all(limit: number = 10, page: number = 1) {
    const entries = await this.model.query().paginate(page, limit);
    return entries;
  }

  /**
   * Creates a new entry in the model if an entry with the same field value does not already exist.
   * @param fieldName The field name to check for existing entries.
   * @param payload The data payload for the new entry.
   * @returns The newly created entry.
   * @throws Error if an entry with the same field value already exists.
   */
  async create(fieldName: string, payload: Payload) {
    const isExist = await this.model.findBy(fieldName, payload[fieldName]);

    if (isExist) {
      throw new Error('Entry already exists');
    }

    const entry = await this.model.create(payload);
    return entry;
  }

  /**
   * Updates an existing entry by a specific field name.
   * @param fieldName The field name to identify the entry.
   * @param payload The data payload for updating the entry.
   * @returns The updated entry.
   * @throws Error if the entry is not found.
   */
  async update(fieldName: string, payload: Payload) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);

    if (!entry) {
      throw new Error('Entry not found');
    }

    entry.merge(payload);
    await entry.save();
    return entry;
  }

  /**
   * Updates an existing entry by its ID.
   * @param id The ID of the entry to update.
   * @param payload The data payload for updating the entry.
   * @returns The updated entry.
   * @throws Error if the entry is not found.
   */
  async updateById(id: number, payload: Payload) {
    const entry = await this.model.findBy('id', id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    entry.merge(payload);
    await entry.save();
    return entry;
  }

  /**
   * Deletes an existing entry by a specific field name.
   * @param fieldName The field name to identify the entry.
   * @param payload The data payload containing the field value.
   * @returns The result of the delete operation.
   * @throws Error if the entry is not found.
   */
  async delete(fieldName: string, payload: Payload) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);

    if (!entry) {
      throw new Error('Entry not found');
    }

    return await entry.delete();
  }

  /**
   * Deletes an entry by its ID.
   * @param id The ID of the entry to delete.
   * @returns The result of the delete operation.
   * @throws Error if the entry is not found.
   */
  async deleteById(id: number) {
    const entry = await this.model.findBy('id', id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return await entry.delete();
  }

  /**
   * Retrieves an entry by its ID.
   * @param id The ID of the entry to retrieve.
   * @returns The retrieved entry.
   * @throws Error if the entry is not found.
   */
  async getById(id: number) {
    const entry = await this.model.findBy('id', id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }

  /**
   * Retrieves an entry by a specific field name and value.
   * @param fieldName The field name to query by.
   * @param payload The payload containing the value for the specified field.
   * @returns The retrieved entry.
   * @throws Error if the entry is not found.
   */
  async getOneByField(fieldName: string, payload: Payload) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }


  // some additional methods to enhance functionality and flexibility:


  async findByConditions(conditions: any) {
    return await this.model.query().where(conditions)
  }

 /*  async createMany(payloads: Payload,fieldName?: string) {
    //todo: add transaction


      payloads.forEach(async (payload: Payload) => {
        if(fieldName) {
          await this.create(fieldName, payload)
        } else {
          await this.model.create(payload)
        }
      })




     // Commit transaction if all operations are successful


   // return await this.model.createMany(payloads);
   //for(const payload of payloads) {
    //await this.create(fieldName, payload)
   //}
  } */



  async updateMany(fieldName: string, value: any, payload: Payload) {
    const entries = await this.model.query().where(fieldName, value).update(payload);
    return entries;
  }

  async deleteMany(fieldName: string, value: any) {
    const entries = await this.model.query().where(fieldName, value).delete();
    return entries;
  }

  async count(fieldName?: string, value?: any) {
    if (fieldName && value) {
        return await this.model.query().where(fieldName, value).count('*');
    } else {
      const totalRows = await this.model.query().count('* as total');
      const count = totalRows[0].$extras.total
        return count
    }
  }

  async exists(fieldName: string, value: any) {
    const entry = await this.model.findBy(fieldName, value);
    return !!entry;
  }

  /* async softDeleteById(id: number) {
    const entry = await this.model.find(id);
    if (!entry) {
        throw new Error('Entry not found');
    }
    entry.deleted_at = new Date(); // assuming 'deleted_at' is a field for soft deletes
    await entry.save();
    return entry;
  } */

  /* async recoverById(id: number) {
    const entry = await this.model.query().withTrashed().where('id', id).first();
    if (!entry) {
        throw new Error('Entry not found');
    }
    entry.deleted_at = null;
    await entry.save();
    return entry;
  } */


}

