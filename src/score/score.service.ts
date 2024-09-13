import { Injectable } from '@nestjs/common';
import { ScoreRepositoryService } from './score.repository.service';
import { Player } from './models/player.schema';
import { TeamType } from './models/interface/score.model.interface';
import { Team } from './models/team.schema';
import { TeamsDto } from './dto/read-teams.dto';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepositoryService: ScoreRepositoryService,
  ) {}

  async getTeams(): Promise<TeamsDto> {
    const teams = await this.scoreRepositoryService.getAllTeams();
    if (!teams || !teams.length) {
      const [India, Pakistan] = await Promise.all([
        this.createTeam({ teamName: 'India', teamType: TeamType.BATTERS }),
        this.createTeam({ teamName: 'Pakistan', teamType: TeamType.BOWLERS }),
      ]);

      // Create player for India
      const players = [
        { playerName: 'Rohit Sharma', teamId: India._id.toString() },
        { playerName: 'Shubman Gill', teamId: India._id.toString() },
        { playerName: 'Virat Kohli', teamId: India._id.toString() },
        { playerName: 'KL Rahul', teamId: India._id.toString() },
        { playerName: 'Hardik Pandya', teamId: India._id.toString() },
        { playerName: 'Ravindra Jadeja', teamId: India._id.toString() },
        { playerName: 'Shardul Thakur', teamId: India._id.toString() },
        { playerName: 'Jasprit Bumrah', teamId: India._id.toString() },
        { playerName: 'Kuldeep Yadav', teamId: India._id.toString() },
        { playerName: 'Mohammed Siraj', teamId: India._id.toString() },
        { playerName: 'Mohammed Shami', teamId: India._id.toString() },
        { playerName: 'Babar Azam', teamId: Pakistan._id.toString() },
        { playerName: 'Mohammad Rizwan', teamId: Pakistan._id.toString() },
        { playerName: 'Fakhar Zaman', teamId: Pakistan._id.toString() },
        { playerName: 'Imam-ul-Haq', teamId: Pakistan._id.toString() },
        { playerName: 'Shadab Khan', teamId: Pakistan._id.toString() },
        { playerName: 'Iftikhar Ahmed', teamId: Pakistan._id.toString() },
        { playerName: 'Shaheen Afridi', teamId: Pakistan._id.toString() },
        { playerName: 'Haris Rauf', teamId: Pakistan._id.toString() },
        { playerName: 'Naseem Shah', teamId: Pakistan._id.toString() },
        { playerName: 'Mohammad Nawaz', teamId: Pakistan._id.toString() },
        { playerName: 'Agha Salman', teamId: Pakistan._id.toString() },
      ];

      const playersRes: Player[] = await this.createPlayers(players);
      return this.dataTransform([India, Pakistan], playersRes);
    } else {
      const players: Player[] = await this.scoreRepositoryService.getPlayers();
      return this.dataTransform(teams, players);
    }
  }

  private async createTeam(team: Team): Promise<Team> {
    return await this.scoreRepositoryService.createTeam(team);
  }

  private async createPlayers(players: Player[]): Promise<Player[]> {
    return await this.scoreRepositoryService.createPlayers(players);
  }

  private dataTransform(teamData: Team[], playerData: Player[]): TeamsDto {
    const res: TeamsDto = { teams: [] };
    console.log(':::::::::', teamData);
    for (let i = 0; i < teamData.length; i++) {
      const players = [];
      for (let j = 0; j < playerData.length; j++) {
        if (teamData[i]._id.toString() === playerData[j].teamId.toString()) {
          players.push({
            playerId: playerData[j]._id.toString(),
            playerName: playerData[j].playerName,
          });
        }
      }
      res.teams.push({
        teamName: teamData[i].teamName,
        teamId: teamData[i]._id.toString(),
        teamType: teamData[i].teamType,
        players: players,
      });
    }
    return res;
  }
}
