import { inject } from "@adonisjs/core";
import { BaseModel } from "@adonisjs/lucid/orm";


@inject()
export class CrudService {

  protected model: typeof BaseModel;

  constructor(model: typeof BaseModel) {
    this.model = model;
  }


  async create(payload: any,fieldName: string) {
    const isExist = await this.model.findBy(fieldName, payload[fieldName]);

    if (isExist) {
      throw new Error('Entry already exists');
    }

    const entry = await this.model.create(payload);
    return entry;
  }

  async update(payload: any, fieldName: string) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);

    if (!entry) {
      throw new Error('Entry not found');
    }

    entry.merge(payload);
    await entry.save();
    return entry;
  }

  async delete(payload: any, fieldName: string) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);

    if (!entry) {
      throw new Error('Entry not found');
    }

    return await entry.delete();

  }

  async getAll() {
    const entries = await this.model.query();
    return entries;
  }

  async getOne(payload: any, fieldName: string) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }

  async getOneByField(payload: any, fieldName: string) {
    const entry = await this.model.findBy(fieldName, payload[fieldName]);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }







}

