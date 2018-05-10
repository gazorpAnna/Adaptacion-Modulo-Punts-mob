import { Component } from '@angular/core';
import { MenuController, PopoverController, Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { GroupService } from '../../providers/group.service';
import { PointService } from '../../providers/point.service';
import { SchoolService } from '../../providers/school.service';
import { UtilsService } from '../../providers/utils.service';
import { PointRelationService } from '../../providers/pointRelation.service';
import { Group } from '../../model/group';
import { Student } from '../../model/student';
import { School } from '../../model/school';
import { PointRelation } from '../../model/pointRelation';
import { StudentPage } from '../students/student/student';
import { PointsPage } from '../points';
import { BadgesPage } from '../badges';
import { GroupPointPage } from './groupPoint/groupPoint';
import { GroupPointCreatePage } from './groupPointCreate/groupPointCreate';
import { GroupBadgePage } from './groupBadge/groupBadge';
import { GroupBadgeCreatePage } from './groupBadgeCreate/groupBadgeCreate';
import { Point } from '../../model/point';
import { Badge } from '../../model/badge';
import { Role } from '../../model/role';


@Component({
  selector: 'page-group',
  templateUrl: './group.html'
})
export class GroupPage {

  public point: Point= new Point();  
  public student: Student;
  public school: School;
  public pointRelation: PointRelation = new PointRelation();  
  public points: Array<Point>;
  public group: Group;
  public grid: Array<Array<Student>>; //array of arrays
  private students: Array<Student>;
  private elements: number = 3;
  public isDisabled = true;
  public pointDisabled = true;
  public studentsPoint = false;
  public isDisabledStudent = true;  
  public pointRelations: Array<PointRelation>;
  

  public myRole: Role;
  public role = Role;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public utilsService: UtilsService,
    public groupService: GroupService,
    public schoolService: SchoolService,    
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public translateService: TranslateService) {

    this.students = this.navParams.data.students;
    this.group = this.navParams.data.group;
    this.grid = Array(Math.ceil(this.students.length / this.elements));
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    
    this.prepareGrid();
    this.ionicService.removeLoading();

    this.myRole = this.utilsService.role;
  }



  /**
   * This method returns the students list of the
   * current school
   * @param {Refresher} Refresher element
   */
  private getStudents(refresher?: Refresher): void {

    this.groupService.getMyGroupStudents(this.group.id).finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Student>) => this.prepareGrid()),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    this.schoolService.getMySchool().finally(() => {}).subscribe(
		((value: School) => {
		  this.school = value
      /*this.pointRelation.schoolId = this.school.id*/
      this.pointRelation.groupId = this.navParams.data.group.id      
    }))    
  }

  /**
   * This method converts an array of students into a
   * col-row matrix for being displayed into a grid
   */
  private prepareGrid(): void {
    let rowNum = 0;
    for (let i = 0; i < this.students.length; i += this.elements) {
      this.grid[rowNum] = Array(this.elements);
      for (let y = 0; y < this.elements; y++) {
        if (this.students[i + y]) {
          this.grid[rowNum][y] = this.students[i + y];
        }
      }
      rowNum++;
    }
  }

  /**
   * Method called from the home page to open the list of the
   * students of the school of the current user
   */
  public goToStudentDetail(student: Student): void {
    this.navController.push(StudentPage, { student: student })
  }

  private getPointsEstudent(): void {
    this.getPoints();
    this.pointRelationService.getMyStudentPoints1(this.group.id).finally(() => { }).subscribe(
      ((value: Array<PointRelation>) => this.pointRelations = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    this.studentsPoint=true
  }
  
  private getPointsGroup(): void {
    this.getPoints();
    this.pointRelationService.getMyGroupStudentPoints(this.group.id).finally(() => { }).subscribe(
      ((value: Array<PointRelation>) => this.pointRelations = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    this.studentsPoint=true
  }

  public getNormal(): void {    
    this.studentsPoint=false
    this.isDisabledStudent=true    
  }

  private getPoints(): void {	  
  this.schoolService.getMySchoolPoints().finally(() => { }).subscribe(
      ((value: Array<Point>) => this.points = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));

    if (this.myRole === Role.TEACHER) {
      this.isDisabled=false
    }
    else if (this.myRole === Role.STUDENT) {
      this.isDisabledStudent=false
    }
  }
  
  
  public givePoint(point: Point): void {
    this.point = point    
    this.pointDisabled=false
    this.isDisabled=true
    /*this.pointRelation.pointId = point.id*/
    this.pointRelation.value = point.value    
  }

  public selectPoint(point: Point): void {
    this.point = point
  }

  public goTogroupPointCreateDetail(group: Group): void {
    this.navController.push(GroupPointCreatePage, { group: group })
  }

  public goTogroupPointDetail(group: Group): void {    
    this.navController.push(GroupPointPage, { group: group })
  }

  public goTogroupBadgeCreateDetail(group: Group): void {
    this.navController.push(GroupBadgeCreatePage, { group: group })
  }

  public goTogroupBadgeDetail(group: Group): void {    
    this.navController.push(GroupBadgePage, { group: group })
  }
}
