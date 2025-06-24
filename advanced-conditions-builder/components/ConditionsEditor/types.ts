export type Condition = {
	id: string;
	type: 'rule' | 'group';
	rule?: {
		property: 'phone' | 'username' | 'email' | null,
		action: 'contains' | 'not-contains' | 'equals-to' | null,
		value: String
	};
	operator?: 'AND' | 'OR';
	conditions: Condition[];
}

export type PolicyMain = {
	id: string;
	operator: 'AND' | 'OR';
	conditions: Condition[];
}