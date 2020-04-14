import React, {Component} from 'react';
import {Atk, AtkIncrease, DmgIncrease, BossAtk, SkillDmg, SkillHit, CritRate, CritDmg, FinalDmg, SkillFinalDmg} from './Components/CalculatorItems';
import Swal from 'sweetalert2';
import {CalculateButton, MoreStatsButton, } from './Components/Buttons';
import {DamageFormula, BossDamageFormula, MoreStats } from './Components/PopUps'
import DamageChart from './Components/DamageChart';
import Navbar from './Components/Navbar';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalculator, faTimes, faArrowRight, faCaretDown, faSave, faEdit, faSquareRootAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faCalculator, faTimes, faArrowRight, faCaretDown, faSave, faEdit, faSquareRootAlt)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  atk: '',
                        atkIncrease: '',
                        dmgIncrease: '',
                        bossAtk: '',
                        skillDmg: '',
                        skillHit: '',
                        critRate: '',
                        critDmg: '',
                        finalDmg: '',
                        skillFinalDmg: '',
                        totalDmg: '',
                        totalCritDmg: '',
                        totalNonCritDmg: '',
                        totalBossDmg: '',
                        totalBossCritDmg: '',
                        totalBossNonCritDmg: '',
                        damageFormula: false,
                        bossDamageFormula: false,
                        moreStats: false,
                      }
    }

    damageCalc = () => {
        const round = (num, places) => {
            var multiplier = Math.pow(10, places);
            return Math.round(num * multiplier) / multiplier;
        }

        let atk = this.state.atk;
        let atkIncrease = this.state.atkIncrease;
        let dmgIncrease = this.state.dmgIncrease;
        let bossAtk = this.state.bossAtk;
        let skillDmg = this.state.skillDmg;
        let skillHit = this.state.skillHit;
        let critRate = this.state.critRate;
        let critDmg = this.state.critDmg;
        let finalDmg = this.state.finalDmg;
        let skillFinalDmg = this.state.skillFinalDmg;

        let totalDamageWithoutCrit = (atk) * (skillDmg/100) * (1+dmgIncrease/100) * (1+(finalDmg/100)+(skillFinalDmg/100)) * (1+atkIncrease/100) * (skillHit);
        let totalDamageWithCrit = (atk) * (skillDmg/100) * (1+dmgIncrease/100) * (1+(finalDmg/100)+(skillFinalDmg/100)) * (1+atkIncrease/100) * (1.2+critDmg/100) * (skillHit);

        let totalAverageDamage = ((1 - critRate/100) * totalDamageWithoutCrit) + ((critRate/100) * totalDamageWithCrit);
        let totalCritDamagePerLine = totalDamageWithCrit / skillHit;
        let totalNonCritDamagePerLine = totalDamageWithoutCrit / skillHit;

        let totalBossDamageWithoutCrit = (atk) * (skillDmg/100) * (1+dmgIncrease/100) * (1+(finalDmg/100)+(skillFinalDmg/100)) * (1+(atkIncrease/100)+(skillDmg/100)*(bossAtk/100)) * (skillHit);
        let totalBossDamageWithCrit = (atk) * (skillDmg/100) * (1+dmgIncrease/100) * (1+(finalDmg/100)+(skillFinalDmg/100)) * (1+(atkIncrease/100)+(skillDmg/100)*(bossAtk/100)) * (1.2+critDmg/100) * (skillHit);

        let totalAverageBossDamage = ((1 - critRate/100) * totalBossDamageWithoutCrit) + ((critRate/100) * totalBossDamageWithCrit);
        let totalCritBossDamagePerLine = totalBossDamageWithCrit / skillHit;
        let totalNonCritBossDamagePerLine = totalBossDamageWithoutCrit / skillHit;

        let totalDamageRound = round(totalAverageDamage,0);
        let totalCritDamageRound = round(totalCritDamagePerLine,0);
        let totalNonCritDamageRound = round(totalNonCritDamagePerLine,0);

        let totalBossDamageRound = round(totalAverageBossDamage,0);
        let totalBossCritDamageRound = round(totalCritBossDamagePerLine,0);
        let totalBossNonCritDamageRound = round(totalNonCritBossDamagePerLine,0);

        if (atk === "" || atkIncrease === "" || dmgIncrease ===  "" || bossAtk === '' || bossAtk === '' || dmgIncrease === '' || skillDmg === '' || skillHit === '' || critRate === '' || critDmg === '' || finalDmg === '' || skillFinalDmg === '') {
            return Swal("Please input all stats", "", "warning");
        }

        if (critRate > 100) {
            return Swal("You can't have more than", "100% Crit Rate!", "warning")
        }

        this.setState({ totalDmg: totalDamageRound, 
                        totalCritDmg: totalCritDamageRound,
                        totalNonCritDmg: totalNonCritDamageRound,
                        totalBossDmg: totalBossDamageRound,
                        totalBossCritDmg: totalBossCritDamageRound,
                        totalBossNonCritDmg: totalBossNonCritDamageRound,
        })
    }

    refreshPage = () => {
        window.location.reload();
    } 

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.damageCalc();
        }
    }

    toggleDamageFormula = () => {
        this.setState({damageFormula: !this.state.damageFormula})
    }

    toggleBossDamageFormula = () => {
        this.setState({bossDamageFormula: !this.state.bossDamageFormula})
    }

    toggleMoreStats = () => {
        this.setState({moreStats: !this.state.moreStats})
    }

    resetButton = () => {
        this.setState({
            atk: '',
            atkIncrease: '',
            dmgIncrease: '',
            bossAtk: '',
            skillDmg: '',
            skillHit: '',
            critRate: '',
            critDmg: '',
            finalDmg: '',
            skillFinalDmg: '',
            totalDmg: '',
            totalCritDmg: '',
            totalNonCritDmg: '',
            totalBossDmg: '',
            totalBossCritDmg: '',
            totalBossNonCritDmg: '',
        })
    }

    render() {
        const show = (this.state.damageFormula) ? "show" : "" ;
        const hi = (this.state.moreStats) ? "show" : "" ;
        return (
            <div>
                <div className="nowrap">
                    <Navbar />
                </div>
                <div className="bg-washed-yellow mt2">
                <div className="bg-light-yellow w-90 tc center rounded">
                <div className="tc w-100 h-100 p-2">
                    <MoreStatsButton toggleMoreStats={this.toggleMoreStats} toggleDamageFormula={this.toggleDamageFormula}/>
                    <div className={"collapse navbar-collapse " + show}>
                            <DamageFormula
                                atk={this.state.atk}
                                atkIncrease={this.state.atkIncrease}
                                dmgIncrease={this.state.dmgIncrease}
                                bossAtk={this.state.bossAtk}
                                skillDmg={this.state.skillDmg}
                                skillHit={this.state.skillHit}
                                critRate={this.state.critRate}
                                critDmg={this.state.critDmg}
                                finalDmg={this.state.finalDmg}
                                skillFinalDmg={this.state.skillFinalDmg} 
                            />
                    </div>
                    <div className={"collapse navbar-collapse " + show}>
                            <BossDamageFormula
                                atk={this.state.atk}
                                atkIncrease={this.state.atkIncrease}
                                dmgIncrease={this.state.dmgIncrease}
                                bossAtk={this.state.bossAtk}
                                skillDmg={this.state.skillDmg}
                                skillHit={this.state.skillHit}
                                critRate={this.state.critRate}
                                critDmg={this.state.critDmg}
                                finalDmg={this.state.finalDmg}
                                skillFinalDmg={this.state.skillFinalDmg} 
                            />
                    </div>
                </div>
                    <div className="tc">
                        <DamageChart 
                            totalDmg={this.state.totalDmg} 
                            totalNonCritDmg={this.state.totalNonCritDmg}
                            totalCritDmg={this.state.totalCritDmg}
                        />
                        <div className={"collapse navbar-collapse " + hi}>
                        <MoreStats 
                            totalBossDmg={this.state.totalBossDmg}
                            totalBossNonCritDmg={this.state.totalBossNonCritDmg}
                            totalBossCritDmg={this.state.totalBossCritDmg}
                        />
                        </div>
                    </div>
                    <hr />
                <form className="form-group m-2 p-2" onKeyPress={this._handleKeyPress}>
                    <div className="row justify-content-center">
                        <div className="col col-lg-3 text-center">
                            <Atk onValueChange={atk => this.setState({ atk })}/>
                            <AtkIncrease onValueChange={atkIncrease => this.setState({ atkIncrease })}/>
                            <DmgIncrease onValueChange={dmgIncrease => this.setState({ dmgIncrease })}/>
                            <BossAtk onValueChange={bossAtk => this.setState({ bossAtk })}/>
                            <FinalDmg onValueChange={finalDmg => this.setState({ finalDmg })}/>
                        </div>
                        <div className="col col-lg-3 text-center">
                            <SkillDmg onValueChange={skillDmg => this.setState({ skillDmg })}/>
                            <SkillHit onValueChange={skillHit => this.setState({ skillHit })}/>
                            <CritRate onValueChange={critRate => this.setState({ critRate })}/>
                            <CritDmg onValueChange={critDmg => this.setState({ critDmg })}/>
                            <SkillFinalDmg onValueChange={skillFinalDmg => this.setState({ skillFinalDmg })}/>
                        </div>
                    </div>
                    <hr />
                    <div className="tc">
                        <CalculateButton damageCalc={this.damageCalc}/>
                    </div>
                </form>
            </div>  
            </div> 
        </div>                 
        )    
    }
}

export default App;
