import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

export class CustomForm {
  form_generator: any;
  data: any;
};

@Injectable()
export class FormService {

  constructor() {}

  getForm(id: number | string): CustomForm {
    if (id === '1'){
      let schema: any = {
        "$schema": "http://json-schema.org/draft-03/schema#",
        "type": "object",
        "properties": {
          "pageNum": {
            "type": "integer",
            "title": "Page number",
            "description": "Page number to be queried, `1-based`. See [Pagination](https://en.wikipedia.org/wiki/Pagination) for more details",
            "default": 1,
            "required": true
          },
          "pageSize": {
            "type": "integer",
            "title": "Page size",
            "description": "Number of records per page",
            "required": true,
            "default": 50,
            "enum": [
              10,
              25,
              50,
              100
            ]
          },
          "selectedFacetValues": {
            "type": "array",
            "title": "Query terms",
            "minItems": 2,
            "items": {
              "description": "Query item",
              "type": "object",
              "properties": {
                "facetName": {
                  "type": "string",
                  "title": "Field name",
                  "description": "Indexed field name",
                  "required": true
                },
                "matchAllNull": {
                  "type": "boolean",
                  "title": "Match nulls"
                },
                "matchAllNotNull": {
                  "type": "boolean",
                  "title": "Match not nulls"
                },
                "facetValues": {
                  "type": "array",
                  "title": "Field values",
                  "items": {
                    "type": "object",
                    "properties": {
                      "value": {
                        "type": "string",
                        "title": "Value"
                      }
                    }
                  }
                },
                "included": {
                  "type": "boolean",
                  "title": "Included"
                }
              }
            }
          },
          "sorts": {
            "type": "array",
            "title": "Sorting",
            "items": {
              "type": "object",
              "properties": {
                "fieldName": {
                  "type": "string",
                  "title": "Field name"
                },
                "ascending": {
                  "type": "boolean",
                  "title": "Ascending"
                }
              }
            }
          }
        }
      };
      let BrutusinForms = (window as any).brutusin["json-forms"];
      let bf = BrutusinForms.create(schema);
      let data: any = {
        "pageNum": 1,
        "pageSize": 50,
        "selectedFacetValues": [
          {
            "facetName": "id",
            "matchAllNull": false,
            "matchAllNotNull": true,
            "facetValues": [
              {
                "value": "1223"
              }
            ],
            "included": false
          }
        ],
        "sorts": [
          {
            "fieldName": "name",
            "ascending": true
          }
        ]
      };
      return {
        form_generator: bf,
        data: data
      };
    }
    else if (id === '2'){
      let schema: any = {
        "$schema": "http://json-schema.org/draft-03/schema#",
        "type": "object",
        "properties": {
          "prop1": {
            "type": "string",
            "title": "A short string",
            "description": "A short string property whose input is rendered as `input`"
          },
          "prop2": {
            "type": "string",
            "title": "A long text",
            "format": "text",
            "description": "A long text property whose input is rendered as `textarea`"
          }
        }
      };
      let BrutusinForms = (window as any).brutusin["json-forms"];
      let bf = BrutusinForms.create(schema);
      return {
        form_generator: bf,
        data: {}
      };
    }
    else{
      return null;
    }
  }
}

@Injectable()
export class FormResolver implements Resolve<CustomForm> {
  constructor(
    private fs: FormService,
    private router: Router
  ) {}

  getForm(form){
    if (form) {
      return form;
    } else { // id not found
      this.router.navigate(['/crisis-center']);
      return null;
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomForm> {
    let id = route.paramMap.get('id');
    let form = this.fs.getForm(id);
    return this.getForm(form);
  }
}
