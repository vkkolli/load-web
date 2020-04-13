export class Lookup {
  id: number;
  name: string;

  constructor (id: string, name: string) {
    this.name = name;
    this.id = parseInt(id);

  }
}
