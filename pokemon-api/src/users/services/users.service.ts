import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addPokemon(userId: string, pokemonId: string): Promise<any> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.addPokemonToUser(user, pokemonId);
  }

  async removePokemon(userId: string, pokemonId: string): Promise<any> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.removePokemonFromUser(user, pokemonId);
  }

  async getUserPokemonCollection(userId: string): Promise<string[]> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.getUserPokemonCollection(userId);
  }
}
