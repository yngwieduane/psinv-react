
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Person {
    id: number;
    name: string;
};

export interface Buy {
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
};
export interface Rent {
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
};
export interface CommunitiesAbuDhabi {
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
};
export interface CommunitiesDubai {
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
};
export interface More {
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
};

export interface CallToAction {
    name: string;
    href: string;
    icon: React.ElementType;
};

export interface CallToAction2{
    name: string;
    href: string;
    // icon can be either a component (React.ElementType) or a FontAwesome icon definition
    icon: React.ElementType | IconDefinition;
};

export interface SocialMedia{
    name: string;
    href: string;
    icon: any;
};